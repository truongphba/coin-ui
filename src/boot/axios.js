import axios from 'axios'

const token = localStorage.getItem(process.env.TOKEN_NAME)

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  Vue.prototype.$axios.defaults.baseURL = process.env.API_URL
  Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  if (token) {
    Vue.prototype.$axios.defaults.headers.common.Authorization = 'Bearer ' + token
  }
}
