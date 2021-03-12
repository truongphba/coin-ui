<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-deep-purple-10 text-white">
      <q-toolbar>
        <q-toolbar-title style="width: 20%">
          <q-avatar>
            <img src="images/logo_coin.png">
          </q-avatar>
          <span class="title"><span class="text-cyan-7">500K</span>oin</span>
        </q-toolbar-title>
        <q-btn v-if="!user.data" style="margin-right: 10px" :to="{name: 'login'}" :ripple="false" color="secondary" label="Login" no-caps />
        <div v-else class="account">
          <q-icon inline-label name="account_circle" style="font-size: 25pt">
            <q-menu style="width: 100px"
              transition-show="flip-right"
              transition-hide="flip-left">
              <q-list style="min-width: 100px">
                <q-item>
                  <q-item-section>Name: {{ user.data ? user.data.userName : '' }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>Member: {{ getMemberType }}</q-item-section>
                </q-item>
                <q-item :to="{name: 'logout'}" clickable>
                  <q-item-section >Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>
        <q-tabs
          v-model="tab"
          inline-label
          class="text-white"
        >
          <q-route-tab
            :to="{name: 'home'}"
            name="home"
            icon="home"
            label="Home"
            exact
          />
          <q-route-tab
            :to="{name: 'market', query: { exchanges : 'bitfinex' , currency : 'USDT'}}"
            name="market"
            icon="analytics"
            label="Market"
            exact
          />
          <q-route-tab v-if="user.data"
            :to="{name: 'news'}"
            name="news"
            icon="articles"
            label="News"
            exact
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-if="finished"/>
    </q-page-container>

    <q-footer elevated class="bg-deep-purple-10 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center footer-title">
          © 2021 500K Team
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Layout',
  data () {
    return {
      dropMenu: null,
      tab: null,
      finished: false
    }
  },
  async mounted () {
    const isLoggedIn = (
      typeof localStorage.getItem(process.env.TOKEN_NAME) !== 'undefined' &&
      localStorage.getItem(process.env.TOKEN_NAME) !== null
    )
    if (isLoggedIn) {
      await this.fetchUserInfo()
    }
    this.finished = true
  },
  computed: {
    ...mapState('auth', [
      'user',
      'isLoading',
      'error'
    ]),
    getMemberType () {
      const type = this.user.data ? this.user.data.subscribeType : ''
      if (type === 1) {
        return 'Bronze'
      } else if (type === 2) {
        return 'Silver'
      } else if (type === 3) {
        return 'Gold'
      } else {
        return 'None'
      }
    }
  },
  methods: {
    ...mapActions({
      fetchUserInfo: 'auth/fetchUserInfo'
    })
  }
}
</script>

<style scoped>
.title {
  font-family: 'Shadows Into Light', cursive;
  font-size: 20pt;
  padding-left: 10px;
}

.account {
  width: 50px;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.member {
  position: absolute;
  top: -4px;
  font-size: 15pt;
  right: 12px;
  z-index: 2;
}

.footer-title {
  font-size: 10pt;
}
.menu-active{
  background: white;
}
</style>
