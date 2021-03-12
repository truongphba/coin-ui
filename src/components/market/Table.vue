<template>
  <div style="width: 100%">
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
      <q-tr :props="props" @click="fetchDetail(props.row.symbol)">
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
  <q-dialog v-model="currenciesDetailModal">
    <q-card class="bg-indigo">
      <q-card-section>
        <div class="text-h6 text-white">Currency Detail</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-card class="my-card">
          <q-card-section v-if="detail">
            <p><strong>Name:</strong> {{ detail.name }}</p>
            <p><strong>Symbol:</strong> {{ detail.symbol }}</p>
            <p><strong>Description:</strong> <span v-html="detail.description"></span></p>
            <p><strong>Release date:</strong> {{ detail.releaseDate }}</p>
            <p><strong>Website:</strong> <a :href="detail.website"> {{ detail.website }}</a></p>
            <div class="text-center" style="margin-top: 10px">
              <a :href="'https://trading.bitfinex.com/t/' + detail.symbol + ':' + $route.query.currency +'?demo=true'" v-if="$route.query.exchanges === 'bitfinex'"><q-btn  color="indigo" label="Go trading"/></a>
              <a :href="'https://www.binance.com/vi/trade/' + detail.symbol + '_' + $route.query.currency" v-if="$route.query.exchanges === 'binances'"><q-btn  color="indigo" label="Go trading"/></a>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="white" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  </div>
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
      ],
      currenciesDetailModal: false,
      detail: {}
    }
  },
  methods: {
    formatNumber (num) {
      if (num) return num.toFixed(4).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    async fetchDetail (symbol) {
      this.detail = await this.currencies.find(element => element.symbol === symbol)
      this.currenciesDetailModal = true
    }
  }
}
</script>

<style scoped>
  p{
    margin: 0;
  }
</style>
