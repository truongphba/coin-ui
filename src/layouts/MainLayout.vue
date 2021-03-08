<template>
  <q-layout view="lHh LpR lFf">
    <q-header reveal elevated class="bg-primary">
      <q-toolbar>
        <q-btn @click="left = !left" flat round dense icon="menu" class="q-mr-sm"/>
        <q-toolbar-title>{{ $route.meta.title }}</q-toolbar-title>
        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-btn flat round dense icon="fas fa-sign-out-alt" @click="signOut"/>
      </q-toolbar>

    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      side="left"
      elevated
    >
      <div style="height: calc(100% - 117px);padding:10px">
        <q-toolbar>
          <q-avatar>
            <img src="images/logo-50-50.png"/>
          </q-avatar>
          <q-toolbar-title>Admin</q-toolbar-title>
        </q-toolbar>
        <hr/>
        <q-scroll-area style="height:100%;">
          <q-list padding>
            <q-item
              active-class="tab-active"
              exact
              :to="{name: 'dashboard'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="dashboard"/>
              </q-item-section>

              <q-item-section>Thống kê</q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              :to="{name: 'orders'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="receipt"/>
              </q-item-section>

              <q-item-section>Đơn hàng</q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              :to="{name: 'categories'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="category"/>
              </q-item-section>

              <q-item-section>Danh mục</q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              :to="{name: 'products'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="redeem"/>
              </q-item-section>

              <q-item-section>Sản phẩm</q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              :to="{name: 'blogs'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="far fa-newspaper"/>
              </q-item-section>

              <q-item-section>Tin tức</q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              :to="{name: 'contracts'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-file-signature"/>
              </q-item-section>

              <q-item-section>Liên hệ</q-item-section>
            </q-item>

            <q-item
              active-class="tab-active"
              :to="{name: 'banner'}"
              class="q-ma-sm navigation-item"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="fas fa-scroll"/>
              </q-item-section>

              <q-item-section>Banner</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view/>
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      left: false,
      iconArrow: null,
      show: null,
      permission: {}
    }
  },
  async mounted () {
    this.iconArrow = 'expand_less'
    this.show = false
  },
  methods: {
    // ...mapActions({
    //   authLogout: 'auth/logout'
    // }),
    signOut () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push('/login')
        })
    },
    changeIconArrow: function () {
      if (this.iconArrow === 'expand_less') {
        this.show = true
        this.iconArrow = 'expand_more'
      } else {
        this.show = false
        this.iconArrow = 'expand_less'
      }
    }
  }
  // computed: {
  //   ...mapState('auth', [
  //     'user'
  //   ])
  // }
}
</script>

<style>
.q-drawer__content {
  background-color: #304156;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: #1976d2;
}

body {
  background: #f1f1f1 !important;
}
</style>
