<template>
  <q-table
    :data="currencies"
    :columns="columns"
    row-key="symbol"
    style="width: 100% ;box-shadow:none"
    :rows-per-page-options="[0]"
    :pagination.sync="pagination"
    :loading="isLoading"
    hide-bottom
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="symbol" :props="props">
          {{ props.row.symbol }} / {{ currency }}
        </q-td>
        <q-td key="last_price" :props="props">
          {{ formatNumber(props.row.last_price) }}
        </q-td>
        <q-td key="daily_change" class="text-red" :props="props" v-if="props.row.daily_change < 0">
          {{ (props.row.daily_change * 100).toFixed(4) }}%
        </q-td>
        <q-td key="daily_change" class="text-green" :props="props" v-else>
          {{ (props.row.daily_change * 100).toFixed(4) }}%
        </q-td>
        <q-td key="daily_high" :props="props">
          {{ formatNumber(props.row.daily_high) }}
        </q-td>
        <q-td key="daily_low" :props="props">
          {{ formatNumber(props.row.daily_low) }}
        </q-td>
        <q-td key="daily_volume" :props="props">
          {{ formatNumber(props.row.daily_volume) }}  {{ currency }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Table',
  computed: {
    ...mapState('market', [
      'currencies',
      'isLoading',
      'error'
    ])
  },
  props: ['currency'],
  data () {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 0
      },
      columns: [
        {
          name: 'symbol',
          label: 'Symbol',
          align: 'left',
          field: 'symbol',
          sortable: true
        },
        {
          name: 'last_price',
          label: 'Last Price',
          align: 'right',
          field: 'last_price',
          sortable: true
        },
        {
          name: 'daily_change',
          label: '24H Change',
          align: 'right',
          field: 'daily_change',
          sortable: true
        },
        {
          name: 'daily_high',
          label: '24H High',
          align: 'right',
          field: 'daily_high',
          sortable: true
        },
        {
          name: 'daily_low',
          label: '24H Low',
          align: 'right',
          field: 'daily_low',
          sortable: true
        },
        {
          name: 'daily_volume',
          label: '24H Volume',
          align: 'right',
          field: 'daily_volume',
          sortable: true
        }
      ]
    }
  },
  methods: {
    formatNumber (num) {
      if (num) return num.toFixed(4).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style scoped>

</style>
