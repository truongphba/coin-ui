import axios from 'axios'
import { httpClient } from 'src/api/http'

export async function authRequest ({ commit, dispatch }, user) {
  return new Promise((resolve, reject) => {
    commit('authBegin')
    axios({
      url: process.env.API_URL + '/login',
      data: user,
      method: 'POST'
    })
      .then(resp => {
        const data = resp.data
        localStorage.setItem(process.env.TOKEN_NAME, data.token)
        axios.defaults.headers.common.Authorization = 'Bearer ' + data.token
        commit('authSuccess', {
          token: data.token
        })
        resolve(resp)
      })
      .catch(err => {
        commit('authError', err)
        localStorage.removeItem(process.env.TOKEN_NAME)
        reject(err)
      })
  })
}

export async function logout ({ commit }) {
  if (localStorage.getItem(process.env.TOKEN_NAME)) {
    try {
      await httpClient.get('/logout')
    } catch (error) {
    }
  }
  commit('authLogout')
  localStorage.removeItem(process.env.TOKEN_NAME)
  localStorage.removeItem(process.env.USER_NAME)
}
