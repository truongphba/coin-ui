<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="products"
           :columns="columns"
           :is-loading="isLoading"
           :total="total"
           :filter="filter"
           :error="error"
           :is-deleted="isDeleted"
           @request="onRequest"
           @show="showData"
           @delete="handleDelete"
    >
      <template v-slot:filter-top>
        <FilterTable :filtersAttribute="filtersAttribute"
                     @doFilter="handleFilter"
                     @show="showData"
                     :filter-statuses="filterStatuses"
        />
      </template>
    </Table>
    <q-dialog v-model="isShow">
      <FormDialog :is-edit="isEdit" :is-large="true">
        <Form :product="product"
              :all-categories="allCategories"
              :is-saved="isSaved"
              :is-edit="isEdit"
              :error="error"
              @save="handleSave"
              @close="handleClose"
        />
      </FormDialog>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from 'src/components/common/Table'
import FormDialog from 'src/components/common/FormDialog'
import FilterTable from 'src/components/common/FilterTable'
import Form from 'components/product/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Products',
  components: {
    Form,
    Table,
    FormDialog,
    FilterTable
  },
  data () {
    return {
      isShow: false,
      isEdit: false,
      isDetail: false,
      filter: {},
      columns: [
        {
          name: 'images',
          label: 'Ảnh',
          align: 'center',
          field: 'images'
        },
        {
          name: 'name',
          label: 'Tên',
          align: 'left',
          field: 'name'
        },
        {
          name: 'price',
          align: 'center',
          label: 'Giá (VND)',
          field: 'price'
        },
        {
          name: 'discount',
          align: 'center',
          label: 'Giảm (%)',
          field: 'discount'
        },
        {
          name: 'quantity',
          align: 'center',
          label: 'SL',
          field: 'quantity'
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
          align: 'left',
          label: 'Hành động'
        }
      ],
      filtersAttribute: [
        {
          label: 'Tên sản phẩm',
          field: 'name',
          type: 'text'
        },
        {
          label: 'Giảm giá',
          field: 'discount',
          type: 'number'
        },
        {
          label: 'Danh mục',
          field: 'categoryId',
          type: 'select',
          options: []
        },
        {
          label: 'Trạng thái',
          field: 'status',
          type: 'select'
        }
      ]
    }
  },
  async mounted () {
    await this.loadAllCategories()
    this.filtersAttribute
      .find(x => x.field === 'categoryId')
      .options = [
        ...this.allCategories
      ]
  },
  computed: {
    ...mapState('product', [
      'products',
      'total',
      'isLoading',
      'product',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    ...mapState('category', [
      'allCategories'
    ]),
    filterStatuses () {
      return Constants.Status
    }
  },
  methods: {
    ...mapActions({
      loadProducts: 'product/loadProducts',
      loadProduct: 'product/loadProduct',
      saveProduct: 'product/saveProduct',
      deleteProduct: 'product/deleteProduct',
      loadAllCategories: 'category/loadAllCategories',
      clearError: 'product/clearError'
    }),
    async onRequest ({ data, done }) {
      await this.loadProducts({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveProduct(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id) {
        this.isEdit = true
        await this.loadProduct(id)
      }
      this.isShow = true
    },
    async handleDelete ({ id, done }) {
      await this.deleteProduct(id)
      if (done) {
        done()
      }
      await this.onRequest({
        data: this.currentPage
      })
    },
    handleFilter (filter) {
      this.filter = { ...filter }
    },
    async handleClose () {
      await this.onRequest({
        data: this.currentPage
      })
      this.isShow = false
    }
  }
}
</script>
