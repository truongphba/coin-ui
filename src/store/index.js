import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

import auth from './auth'
import banner from './banner'
import category from './category'
import product from './product'
import order from './order'
import article from './article'
import contact from './contact'
import market from './market'
import news from './news'

Vue.use(Vuex)

export default function () {
  const store = new Vuex.Store({
    modules: {
      auth,
      banner,
      category,
      product,
      order,
      article,
      contact,
      market,
      news
    },
    plugins: [createPersistedState({ key: process.env.DATA_NAME })],
    strict: process.env.DEBUGGING
  })

  window.onstorage = function (e) {
    if (e.key === process.env.TOKEN_NAME) {
      if (e.newValue) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + e.newValue
      } else {
        axios.defaults.headers.common.Authorization = null
      }
    } else if (e.key === process.env.USER_NAME) {
      if (e.newValue) {
        store.commit('auth/authSuccess', JSON.parse(e.newValue))
      } else {
        store.commit('auth/authLogout')
      }
    }
  }
  return store
}
