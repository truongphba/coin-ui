import numeral from 'numeral'
import Vue from 'vue'
import { date } from 'quasar'
import { Constants } from '../utils/const'

Vue.filter('filterStatus', function (value) {
  const status = Constants.Status
  for (const item of status) {
    if (item.value === value) {
      return item.label
    }
  }
})

Vue.filter('filterOrderStatus', function (value) {
  const status = Constants.OrderStatus
  for (const item of status) {
    if (item.value === value) {
      return item.label
    }
  }
})

Vue.filter('filterDateTime', function (value) {
  return date.formatDate(value, 'DD/MM/YYYY HH:mm')
})
Vue.filter('filterDate', function (value) {
  return date.formatDate(value, 'DD/MM/YYYY')
})

Vue.filter('formatInteger', function (value) {
  return value ? numeral(value).format('0,0') : ''
})
