<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="orders"
           :columns="columns"
           :is-loading="isLoading"
           :total="total"
           :filter="filter"
           :error="error"
           :is-deleted="isDeleted"
           @request="onRequest"
           @show="showData"
           :is-order="true"
    >
      <template v-slot:filter-top>
        <FilterTable :filtersAttribute="filtersAttribute"
                     @doFilter="handleFilter"
                     @show="showData"
                     :filter-statuses="filterStatuses"
                     :has-add-new="hasAddNew"
        />
      </template>
      <template v-slot:action="props">
        <div class="q-gutter-sm">
          <q-btn dense
                 color="primary"
                 icon="done"
                 v-if="props.row.status === 2"
                 @click="confirm(props.row.id, 1)">
            <q-tooltip>
              Duyệt
            </q-tooltip>
          </q-btn>
          <q-btn dense
                 color="red"
                 icon="clear"
                 v-if="props.row.status === 2"
                 @click="confirm(props.row.id, 0)">
            <q-tooltip>
              Huỷ
            </q-tooltip>
          </q-btn>
          <q-btn dense
                 color="warning"
                 @click="showOrderDetail(props.row)"
                 icon="shopping_cart">
            <q-tooltip>
              Chi tiết
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </Table>
    <q-dialog v-model="isShow">
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Chi tiết đơn hàng</div>
          <Table :data="order"
                 :columns="orderDetailColumns"
                 :is-loading="isLoading"
                 :total="total"
                 :error="error"
                 :isHidePagination="true"
                 :is-flat="true"
          />
          <div class="q-mt-md q-pl-md">
            <div>
              <span class="text-bold">Tổng tiền: </span>
              {{ totalPrice | formatInteger }} VNĐ
            </div>
            <div>
              <span class="text-bold">Ghi chú: </span>
              {{ note }}
            </div>
          </div>
        </q-card-section>
        <slot/>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from 'src/components/common/Table'
import FilterTable from 'src/components/common/FilterTable'
import { Constants } from 'src/utils/const'

export default {
  name: 'Order',
  components: {
    Table,
    FilterTable
  },
  data () {
    return {
      hasAddNew: false,
      isShow: false,
      isEdit: false,
      isDetail: false,
      totalPrice: null,
      note: '',
      filter: {},
      orderDetailColumns: [
        {
          name: 'images',
          label: 'Ảnh sản phẩm',
          align: 'center',
          field: 'images'
        },
        {
          name: 'name',
          align: 'center',
          label: 'Tên sản phẩm',
          field: 'name'
        },
        {
          name: 'price',
          align: 'center',
          label: 'Đơn giá (VNĐ)',
          field: 'price'
        },
        {
          name: 'discount',
          align: 'center',
          label: 'Giảm giá (%)',
          field: 'discount'
        },
        {
          name: 'quantity',
          align: 'center',
          label: 'Số lượng',
          field: 'quantity'
        },
        {
          name: 'unit_price',
          align: 'center',
          label: 'Thành tiền (VND)'
        }
      ],
      columns: [
        {
          name: 'name',
          label: 'Tên khách hàng',
          align: 'left',
          field: 'name'
        },
        {
          name: 'phone',
          align: 'left',
          label: 'SĐT/Email khách hàng',
          field: 'phone'
        },
        {
          name: 'address',
          align: 'left',
          label: 'Địa chỉ khách hàng',
          field: 'address'
        },
        {
          name: 'total_price',
          align: 'center',
          label: 'Tổng tiền (VNĐ)',
          field: 'total_price'
        },
        {
          name: 'created_at',
          align: 'center',
          label: 'Tạo/Cập nhật',
          field: 'created_at'
        },
        {
          name: 'status',
          align: 'center',
          label: 'Trạng thái',
          field: 'status'
        },
        {
          name: 'action',
          align: 'center',
          label: 'Hành động'
        }
      ],
      filtersAttribute: [
        {
          label: 'Tên khách hàng',
          field: 'name',
          type: 'text'
        },
        {
          label: 'Email khách hàng',
          field: 'email',
          type: 'text'
        },
        {
          label: 'SĐT khách hàng',
          field: 'phone',
          type: 'text'
        },
        {
          label: 'Trạng thái',
          field: 'status',
          type: 'select'
        }
      ]
    }
  },
  computed: {
    ...mapState('order', [
      'orders',
      'total',
      'isLoading',
      'order',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    filterStatuses () {
      return Constants.OrderStatus
    }
  },
  methods: {
    ...mapActions({
      loadOrders: 'order/loadOrders',
      loadOrder: 'order/loadOrder',
      saveOrder: 'order/saveOrder',
      clearError: 'order/clearError'
    }),
    async onRequest ({ data, done }) {
      await this.loadOrders({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveOrder(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id) {
        this.isEdit = true
        await this.loadOrder(id)
      }
      this.isShow = true
    },
    handleFilter (filter) {
      this.filter = { ...filter }
    },
    async handleClose () {
      await this.onRequest({
        data: this.currentPage
      })
      this.isShow = false
    },
    async showOrderDetail (order) {
      await this.loadOrder(order.id)
      this.totalPrice = order.total_price
      this.note = order.note
      this.isShow = true
    },
    async confirm (id, status) {
      const title = status === 1 ? 'duyệt' : 'huỷ'
      this.$q
        .dialog({
          title: 'Xác nhận',
          message: `Bạn có chắc chắn muốn ${title} đơn hàng này?`,
          ok: 'Có',
          cancel: 'Không',
          persistent: true
        })
        .onOk(async () => {
          await this.saveOrder({ id, status })
          if (this.error) {
            this.$q.notify({
              color: 'red',
              message: 'Xác nhận đơn hàng thất bại'
            })
          } else {
            await this.onRequest({
              data: this.currentPage
            })
            this.$q.notify({
              color: 'green-4',
              message: 'Xác nhận đơn hàng thành công'
            })
          }
        })
    }
  }
}
</script>
