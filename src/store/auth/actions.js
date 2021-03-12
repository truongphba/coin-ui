import axios from 'axios'
import { httpClient } from 'src/api/http'

export async function authRequest ({ commit, dispatch }, user) {
  const querystring = require('querystring')

  return new Promise((resolve, reject) => {
    commit('authBegin')
    axios({
      url: process.env.SOURCE_URL + '/token',
      data: querystring.stringify({ grant_type: 'password', userName: user.username, password: user.password }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(resp => {
        const data = resp.data
        localStorage.setItem(process.env.TOKEN_NAME, data.access_token)
        axios.defaults.headers.common.Authorization = 'Bearer ' + data.access_token
        commit('authSuccess', {
          token: data.access_token
        })
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        commit('authError', err)
        localStorage.removeItem(process.env.TOKEN_NAME)
        reject(err)
      })
  })
}
export async function register ({ commit, dispatch }, user) {
  console.log(user)
  return new Promise((resolve, reject) => {
    commit('authBegin')
    axios({
      url: process.env.SOURCE_URL + '/api/User/Register',
      data: user,
      method: 'POST'
    })
      .then(resp => {
        commit('registerSuccess')
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        commit('authError', err)
        reject(err)
      })
  })
}
export async function fetchUserInfo ({ commit }) {
  const isLoggedIn = (
    typeof localStorage.getItem(process.env.TOKEN_NAME) !== 'undefined' &&
    localStorage.getItem(process.env.TOKEN_NAME) !== null
  )
  if (isLoggedIn) {
    commit('getUserInfoBegin')
    try {
      const response = await httpClient.get('/User/UserInfo')
      commit('getUserInfoSuccess', {
        data: response
      })
    } catch (error) {
      commit('getUserInfoError', error.response)
      return null
    }
  } else {
    return null
  }
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
