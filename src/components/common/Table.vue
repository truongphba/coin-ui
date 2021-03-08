<template>
  <q-table
    :flat="isFlat"
    :data="data"
    :columns="columns"
    row-key="id"
    :filter="filter"
    :pagination.sync="pagination"
    @request="onRequest"
    :loading="isLoading"
    :rows-per-page-options="[10, 15, 20, 25, 50]"
    :hide-pagination="isHidePagination"
  >
    <template v-slot:top>
      <slot name="filter-top" :filter="filter"></slot>
    </template>

    <template v-slot:body-cell-image_banner="props">
      <q-td :props="props">
        <q-avatar rounded size="50px">
          <img v-if="props.row.image"
               :ratio="1"
               :src="getImageUrl('extra_small', props.row.image)">
          <img v-else :src="getDefaultImageUrl">
        </q-avatar>
      </q-td>
    </template>

    <template v-slot:body-cell-images="props">
      <q-td :props="props">
        <q-avatar rounded size="50px">
          <img v-if="props.row.images"
               :ratio="1"
               :src="getImageUrl('extra_small',props.row.images.split(';')[0])">
          <img v-else :src="getDefaultImageUrl">
        </q-avatar>
      </q-td>
    </template>

    <template v-slot:body-cell-avatar="props">
      <q-td :props="props">
        <q-avatar rounded size="50px">
          <img v-if="props.row.avatar"
               :ratio="1"
               :src="getImageUrl('extra_small',props.row.avatar)">
          <img v-else :src="getDefaultImageUrl">
        </q-avatar>
      </q-td>
    </template>

    <template v-slot:body-cell-phone="props">
      <q-td :props="props">
        {{ props.row.phone }}
        <div class="my-table-details">
          {{ props.row.email }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-address="props">
      <q-td :props="props">
        {{ props.row.address }}
        <div class="my-table-details">
          {{ props.row.ward }}, {{ props.row.district }}, {{ props.row.city }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-description="props">
      <q-td :props="props">
        {{ props.row.description }}
      </q-td>
    </template>

    <template v-slot:body-cell-price="props">
      <q-td :props="props">
        {{ props.row.price | formatInteger }}
      </q-td>
    </template>
    <template v-slot:body-cell-unit_price="props">
      <q-td :props="props">
        {{ props.row.price * (100 - props.row.discount) / 100 * props.row.quantity | formatInteger }}
      </q-td>
    </template>

    <template v-slot:body-cell-total_price="props">
      <q-td :props="props">
        {{ props.row.total_price | formatInteger }}
      </q-td>
    </template>

    <template v-slot:body-cell-discount="props">
      <q-td :props="props">
        {{ props.row.discount }}
      </q-td>
    </template>

    <template v-slot:body-cell-created_at="props">
      <q-td :props="props">
        {{ props.row.created_at | filterDateTime }}
        <div class="my-table-details">
          {{ props.row.updated_at | filterDateTime }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-just_created_at="props">
      <q-td :props="props">
        {{ props.row.created_at | filterDateTime }}
      </q-td>
    </template>

    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <q-chip
          :color="(props.row.status === 1) ? 'green' : (props.row.status === 0) ? 'red' : 'warning'"
          text-color="white"
          dense
          class="text-weight-bold"
          square
        >
          <div v-if="!isOrder">{{ props.row.status | filterStatus }}</div>
          <div v-else>{{ props.row.status | filterOrderStatus }}</div>
        </q-chip>
      </q-td>
    </template>

    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <slot name="action" :row="props.row">
          <div class="q-gutter-sm">
            <q-btn dense
                   color="primary"
                   icon="edit"
                   @click="showData(props.row.id)">
              <q-tooltip>
                Sửa
              </q-tooltip>
            </q-btn>
            <q-btn dense
                   color="red"
                   icon="delete"
                   @click="onDelete(props.row.id)"
                   v-if="props.row.status === 1">
              <q-tooltip>
                Xoá
              </q-tooltip>
            </q-btn>
            <slot name="btn-action" :props="props"></slot>
          </div>
        </slot>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import 'src/utils/filter'
import { Constants } from 'src/utils/const'
import imageMixin from '../mixins/image'

export default {
  name: 'Table',
  mixins: [imageMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    filter: {
      type: Object,
      default: () => {
      }
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isHidePagination: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: () => []
    },
    isOrder: {
      type: Boolean,
      default: false
    },
    isFlat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      optionsNotification: {
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        position: 'top-right'
      },
      isContractMember: null
    }
  },
  async mounted () {
    await this.onRequest({
      pagination: this.pagination
    })
  },
  computed: {
    statuses: function () {
      return Constants.Status
    }
  },
  methods: {
    async onRequest (props) {
      const {
        page,
        rowsPerPage
      } = props.pagination
      const data = {
        filter: this.filter,
        page: page,
        limit: rowsPerPage
      }
      this.$emit('request', {
        data,
        done: () => {
          this.pagination.rowsNumber = this.total
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
        }
      })
    },
    clearFilter () {
      this.$emit('clearFilter')
    },
    async showData (id = null) {
      this.$emit('show', id)
    },
    onDelete (id) {
      this.$q
        .dialog({
          title: 'Xác nhận',
          message: 'Bạn có chắc chắn muốn xoá?',
          ok: 'Có',
          cancel: 'Không',
          persistent: true
        })
        .onOk(() => {
          this.$emit('delete', {
            id: id,
            done: () => this.notify()
          })
        })
    },
    notify () {
      if (this.isDeleted) {
        this.$q.notify({
          color: 'green-4',
          message: 'Xoá thành công'
        })
      } else {
        this.$q.notify({
          color: 'red',
          message: 'Xoá thất bại'
        })
      }
    }
  }
}
</script>
<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  white-space: normal;
  max-width: 200px;
  color: #555;
  margin-top: 4px;
}
</style>
