<template>
  <q-page class="q-py-sm q-pl-sm">
    <Table :data="contacts"
           :columns="columns"
           :is-loading="isLoading"
           :total="total"
           :filter="filter"
           :error="error"
           @request="onRequest"
           :is-order="true"
    >
      <template v-slot:filter-top>
        <FilterTable :filtersAttribute="filtersAttribute"
                     @doFilter="handleFilter"
                     :has-add-new="hasAddNew"
        />
      </template>
    </Table>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from 'src/components/common/Table'
import FilterTable from 'src/components/common/FilterTable'

export default {
  name: 'Contact',
  components: {
    Table,
    FilterTable
  },
  data () {
    return {
      hasAddNew: false,
      filter: {},
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
          name: 'content',
          align: 'left',
          label: 'Nội dung',
          field: 'content'
        },
        {
          name: 'just_created_at',
          align: 'center',
          label: 'Tạo'
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
        }
      ]
    }
  },
  computed: {
    ...mapState('contact', [
      'contacts',
      'total',
      'isLoading',
      'error',
      'currentPage'
    ])
  },
  methods: {
    ...mapActions({
      loadContacts: 'contact/loadContacts',
      clearError: 'contact/clearError'
    }),
    async onRequest ({ data, done }) {
      await this.loadContacts({
        filter: this.filter,
        page: data.page,
        limit: data.limit
      })
      if (done) {
        done()
      }
    },
    handleFilter (filter) {
      this.filter = { ...filter }
    }
  }
}
</script>
