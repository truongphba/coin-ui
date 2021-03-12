<template>
  <div>
    <q-card class="q-ml-sm q-pa-sm bg-indigo-10">
      <div v-for="item in sideCurrencies" :key="item.id">
        <div class="side-currency q-pa-sm text-white" v-if="item.id < 4">
          <div class="row">
            <div class="col-8"><p>{{ item.symbol }}/USDT</p></div>
            <div class="col-4 text-green" v-if="item.daily_change > 0"><p>{{ (item.daily_change * 100).toFixed(4) }}%</p>
            </div>
            <div class="col-4 text-red" v-else><p>{{ (item.daily_change * 100).toFixed(4) }}%</p></div>
          </div>
          <p class="price">{{ formatNumber(item.last_price) }} <span
            class="vnd">= {{ formatNumber(item.last_price * 23000) }} VND</span></p>
          <p class="vol">24H Vol {{ formatNumber(item.daily_volume) }}</p>
        </div>
      </div>
    </q-card>
    <q-card class="q-ml-sm q-mt-sm list-news">
      <div class="news q-pa-sm">
        <p style="font-size: 16pt;" class="text-indigo"> Popular news </p>
      </div>
      <div class="news q-pa-sm" v-for="item in otherNews" :key="item.id">
        <p @click="alertRegister = true" style="cursor: pointer" class="news-title">{{ item.title }}</p>
      </div>
    </q-card>
    <q-dialog v-model="alertRegister">
      <q-card class="bg-indigo" style="width: 800px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-white">Register Member</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <q-card class="my-card" @click="registerMember(3)">
                <q-card-section>
                  <p class="title text-amber-5">Gold Member</p>
                  <p class="price">15$/mo</p>
                  <p class="line bg-amber-5"></p>
                  <p class="content">
                    More news from experts <br>
                    Higher accuracy<br>
                    The optimal choice<br>
                  </p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <q-card class="my-card" @click="registerMember(2)">
                <q-card-section>
                  <p class="title text-blue-grey-6">Silver Member</p>
                  <p class="price">10$/mo</p>
                  <p class="line bg-blue-grey-6"></p>
                  <p class="content">
                    See all the latest news <br>
                    most accurate news<br>
                    Instant continuous notification<br>
                  </p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <q-card class="my-card" @click="registerMember(1)">
                <q-card-section>
                  <p class="title text-brown" >Bronze Member</p>
                  <p class="price">5$/mo</p>
                  <p class="line bg-brown"></p>
                  <p class="content">
                    Receive advice from an expert<br>
                    Support investment decision-making<br>
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="white" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="pay" v-if="user.data && subscribe.data">
      <q-card class="bg-indigo">
        <q-card-section>
          <div class="text-h6 text-white">Register Member</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card class="my-card">
            <q-card-section>
              <p class="title">You are registered {{ getMemberType }} Member</p>
              <p class="price">{{ getPrice }}$/mo</p>
              <p class="line bg-amber-5"></p>
              <p class="content">
                Your code is: <span style="font-weight: bold"> {{ subscribe ? subscribe.data.code : '' }}</span> <br>
                Please wait admin confirm your request<br>
              </p>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Side',
  data () {
    return {
      alertRegister: false,
      pay: false
    }
  },
  computed: {
    ...mapState('subscribe', [
      'subscribe',
      'isLoading',
      'error'
    ]),
    ...mapState('market', [
      'sideCurrencies',
      'isLoading',
      'error'
    ]),
    ...mapState('news', [
      'otherNews',
      'isLoading',
      'error'
    ]),
    ...mapState('auth', [
      'user'
    ]),
    getMemberType () {
      const type = this.subscribe.data ? this.subscribe.data.type : null
      if (type === 1) {
        return 'Bronze'
      } else if (type === 2) {
        return 'Silver'
      } else if (type === 3) {
        return 'Gold'
      } else {
        return 'None'
      }
    },
    getPrice () {
      const type = this.subscribe.data ? this.subscribe.data.type : ''
      if (type === 1) {
        return '5'
      } else if (type === 2) {
        return '10'
      } else if (type === 3) {
        return '15'
      } else {
        return null
      }
    }
  },
  mounted () {
    this.loadSideMarket({ exchanges: 'binances', currency: 'USDT' })
    this.loadOtherNews(this.user.data)
  },
  methods: {
    ...mapActions({
      loadSideMarket: 'market/loadSideMarket',
      clearError: 'market/clearError'
    }),
    ...mapActions({
      loadOtherNews: 'news/loadOtherNews',
      clearError: 'news/clearError'
    }),
    formatNumber (num) {
      if (num) return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    ...mapActions({
      saveSubscribe: 'subscribe/saveSubscribe',
      clearError: 'subscribe/clearError'
    }),
    async registerMember (type) {
      await this.saveSubscribe(type)
      if (this.subscribe) {
        this.alertRegister = false
        this.pay = true
      }
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}

.price {
  font-size: 15pt;
}

.vnd {
  font-size: 10pt;
}

.side-currency {
  border-bottom: 1px solid darkgray;
}

.news-title {
  font-size: 11pt;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
.news {
  border-bottom: 1px solid #E5E5E5;
}
.my-card{
  margin: 5px;
  color: rgb(73, 86, 102);
  text-align: center;
  height: 200px;
  cursor: pointer;
}
.my-card:hover{
  background-color: bisque;
}
.title {
  font-size: 14pt;
  font-weight: bold;
  text-transform: uppercase;
}
.price{
  font-size: 16pt;
  font-weight: bold;
}
.line{
  margin: 10px 40%;
  height: 3px;
  border-radius: 25px;
}
.content{
  color: rgb(73, 86, 102);
}
</style>
