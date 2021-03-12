import { httpClient } from 'src/api/http'

const endPoint = '/User/register-vip'

export async function saveSubscribe ({ commit }, type) {
  commit('saveSubscribeBegin')
  try {
    const response = await httpClient.post(endPoint + '?type=' + type)
    commit('saveSubscribeSuccess', {
      data: response
    })
  } catch (error) {
    commit('saveSubscribeError', error.response)
    return null
  }
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
