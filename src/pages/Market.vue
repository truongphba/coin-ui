<template>
  <q-page class="container">
    <div class="top-content bg-indigo-9">
      <div class="top-coin"></div>
      <q-tabs
        inline-label
        class="text-white shadow-2 exchanges"
        align="left"
        active-bg-color="indigo-1"
        active-color="blue"
        indicator-color="indigo-1"
      >
        <q-route-tab :to="{name: 'market', query: { exchanges : 'bitfinex', currency : 'USDT' }}" :class="{active: exchanges === 'bitfinex', 'tab-market' : true }" name="bitfinex"
                     label="Bitfinex"/>
        <q-route-tab :to="{name: 'market', query: { exchanges : 'binances', currency : 'USDT' }}" :class="{active: exchanges === 'binances', 'tab-market' : true }" name="binances"
                     label="Binances"/>
<!--        <q-route-tab :to="{name: 'market', query: { exchanges : 'houbi', currency : 'USDT' }}" class="tab-market" name="houbi"-->
<!--                     label="Houbi"/>-->
      </q-tabs>
    </div>
    <div class="bg-indigo-1 q-py-md" style="padding-right: 100px; padding-left: 100px">
      <div class="row">
        <div class="col-9">
          <q-card
          bordered
        >
          <q-item class="currency-tab">
            <q-tabs
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-route-tab :to="{name: 'market', query: { exchanges : exchanges , currency : 'USDT'}}" name="USDT"
                           label="USDT"/>
              <q-route-tab :to="{name: 'market', query: { exchanges : exchanges, currency : 'BTC' }}" name="BTC"
                           label="BTC"/>
              <q-route-tab :to="{name: 'market', query: { exchanges : exchanges , currency : 'ETH'}}"  name="ETH"
                           label="ETH"/>
            </q-tabs>
          </q-item>
          <q-item>
            <app-table
              :data="currencies"
              :is-loading="isLoading"
              :currency="currency"
              v-if="currencies"
            ></app-table>
          </q-item>
        </q-card>
        </div>
        <div class="col-3">
          <q-card class="q-ml-sm">
            <div class="side-currency">
              <div class="row">
                <div class="col-8">BTC/USDT</div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <app-register-vip></app-register-vip>
  </q-page>
</template>

<script>
import Table from 'src/components/market/Table'
import RegisterVip from 'src/components/common/RegisterVip'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Market',
  components: {
    'app-table': Table,
    appRegisterVip: RegisterVip
  },
  data () {
    return {
      exchanges: this.$route.query.exchanges,
      currency: this.$route.query.currency
    }
  },
  watch: {
    '$route' (to, from) {
      this.exchanges = to.query.exchanges
      this.currency = to.query.currency
      this.loadMarket({ exchanges: this.exchanges, currency: this.currency })
    }
  },
  computed: {
    ...mapState('market', [
      'currencies',
      'isLoading',
      'error'
    ])
  },
  mounted () {
    this.loadMarket({ exchanges: this.exchanges, currency: this.currency })
  },
  methods: {
    ...mapActions({
      loadMarket: 'market/loadMarket',
      clearError: 'market/clearError'
    })
  }
}
</script>

<style scoped>
.top-content {
  padding: 0 100px;
}

.top-coin {
  height: 100px;
}

.exchanges {
  box-shadow: none;
}

.tab-market {
  margin: 0 1px;
  background: #1a237e;
}
.currency-tab {
  border-bottom: 1px solid #ecf1f8;
}
</style>
