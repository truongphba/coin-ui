<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="categories"
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
      <FormDialog :is-edit="isEdit">
        <Form :category="category"
              :is-saved="isSaved"
              :is-edit="isEdit"
              :all-parent-categories="allParentCategories"
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
import Form from 'components/category/Form'
import { Constants } from 'src/utils/const'

export default {
  name: 'Category',
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
      filter: {},
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Tên',
          align: 'left',
          field: 'name'
        },
        {
          name: 'parent_name',
          align: 'left',
          label: 'Danh mục cha',
          field: 'parent_name'
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
          label: 'Tên danh mục',
          field: 'name',
          type: 'text'
        },
        {
          label: 'Danh mục cha',
          field: 'parentId',
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
    await this.loadAllParentCategories()
    const parent = [{
      id: 0,
      name: 'Không có'
    }]
    this.filtersAttribute[1].options = [
      ...parent,
      ...this.allParentCategories
    ]
  },
  computed: {
    ...mapState('category', [
      'categories',
      'total',
      'isLoading',
      'category',
      'error',
      'isSaved',
      'currentPage',
      'allParentCategories',
      'isDeleted'
    ]),
    filterStatuses () {
      return Constants.Status
    }
  },
  methods: {
    ...mapActions({
      loadCategories: 'category/loadCategories',
      loadCategory: 'category/loadCategory',
      saveCategory: 'category/saveCategory',
      delCategory: 'category/deleteCategory',
      loadAllParentCategories: 'category/loadAllParentCategories',
      clearError: 'category/clearError'
    }),
    async onRequest ({ data, done }) {
      await this.loadCategories({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    async handleSave ({ data, done }) {
      await this.saveCategory(data)
      if (done) {
        done()
      }
    },
    async showData (id = null) {
      await this.clearError()
      this.isEdit = false
      if (id) {
        this.isEdit = true
        await this.loadCategory(id)
      }
      this.isShow = true
    },
    async handleDelete ({ id, done }) {
      await this.delCategory(id)
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
