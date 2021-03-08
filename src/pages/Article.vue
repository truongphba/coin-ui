<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="articles"
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
      <FormDialog :is-edit="isEdit"
                  :is-large="isLarge"
      >
        <Form :article="article"
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
import Form from 'components/article/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Article',
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
      isLarge: true,
      filter: {},
      columns: [
        {
          name: 'avatar',
          align: 'left',
          label: 'Ảnh',
          field: 'avatar'
        },
        {
          name: 'title',
          label: 'Tiêu dề',
          align: 'left',
          field: 'title'
        },
        {
          name: 'created_at',
          align: 'center',
          label: 'Tạo/cập nhật',
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
          label: 'Tiêu đề tin tức',
          field: 'title',
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
    ...mapState('article', [
      'articles',
      'total',
      'isLoading',
      'article',
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
      loadArticles: 'article/loadArticles',
      loadArticle: 'article/loadArticle',
      saveArticle: 'article/saveArticle',
      delArticle: 'article/deleteArticle',
      clearError: 'article/clearError'
    }),
    async onRequest ({ data, done }) {
      await this.loadArticles({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveArticle(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id) {
        this.isEdit = true
        await this.loadArticle(id)
      }
      this.isShow = true
    },
    async handleDelete ({ id, done }) {
      await this.delArticle(id)
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
