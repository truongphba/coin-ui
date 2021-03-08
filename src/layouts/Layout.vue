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
        <div class="account">
          <q-icon class="member text-orange-14" inline-label name="grade"></q-icon>
          <q-icon inline-label name="account_circle" style="font-size: 25pt">
            <q-menu
              transition-show="flip-right"
              transition-hide="flip-left">
              <q-list style="min-width: 100px">
                <q-item>
                  <q-item-section>Gold member</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Logout</q-item-section>
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
          <q-route-tab
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
      <router-view/>
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
export default {
  name: 'Layout',
  data () {
    return {
      dropMenu: null,
      tab: null
    }
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
