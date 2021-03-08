<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table
      :data="banners"
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
        <FilterTable
          :filtersAttribute="filtersAttribute"
          @doFilter="handleFilter"
          @show="showData"
          :filter-statuses="filterStatuses"
        />
      </template>
    </Table>
    <q-dialog v-model="isShow">
      <FormDialog :is-edit="isEdit" :is-large="true">
        <Form :banner="banner"
              :is-saved="isSaved"
              :is-edit="isEdit"
              :error="error"
              image-show-size="original"
              @save="handleSave"
              @close="handleClose"
        />
      </FormDialog>
    </q-dialog>
  </q-page>
</template>

<script>
import Table from 'components/common/Table'
import FilterTable from 'components/common/FilterTable'
import FormDialog from 'src/components/common/FormDialog'
import Form from 'components/banner/Form'
import { mapActions, mapState } from 'vuex'
import { Constants } from 'src/utils/const'

export default {
  name: 'Banner',
  components: {
    Table,
    FilterTable,
    FormDialog,
    Form
  },
  data () {
    return {
      isShow: false,
      isEdit: false,
      isDetail: false,
      filter: {},
      columns: [
        {
          name: 'image_banner',
          label: 'Ảnh',
          align: 'center',
          field: 'image'
        },
        {
          name: 'code',
          label: 'Code',
          align: 'left',
          field: 'code'
        },
        {
          name: 'url_go_to',
          align: 'left',
          label: 'Url',
          field: 'url_go_to'
        },
        {
          name: 'url_title',
          align: 'left',
          label: 'Tiêu đề url',
          field: 'url_title'
        },
        {
          name: 'title',
          align: 'left',
          label: 'Ghi chú',
          field: 'title'
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
          label: 'Code',
          field: 'code',
          type: 'select',
          options: Constants.BannerCodes
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
    ...mapState('banner', [
      'banners',
      'total',
      'isLoading',
      'banner',
      'error',
      'isSaved',
      'currentPage',
      'isDeleted'
    ]),
    filterStatuses () {
      return Constants.Status
    }
  },
  methods: {
    ...mapActions({
      loadBanners: 'banner/loadBanners',
      loadBanner: 'banner/loadBanner',
      saveBanner: 'banner/saveBanner',
      deleteBanner: 'banner/deleteBanner',
      clearError: 'banner/clearError'
    }),
    async onRequest ({
      data,
      done
    }) {
      await this.loadBanners({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({
      data,
      done
    }) {
      await this.saveBanner(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id) {
        this.isEdit = true
        await this.loadBanner(id)
      }
      this.isShow = true
    },
    async handleDelete ({
      id,
      done
    }) {
      await this.deleteBanner(id)
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
