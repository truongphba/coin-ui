import { httpClient } from 'src/api/http'

const endPoint = '/News'

export async function loadNews ({ commit }, user) {
  commit('fetchNewsBegin')
  try {
    const response = await httpClient.get(`${endPoint}`)
    let type = 0
    if (user.subscribeType) {
      type = await user.subscribeType
    }
    const data = await response.filter(element => element.type <= type)
    commit('fetchNewsSuccess', {
      data: data
    })
  } catch (error) {
    commit('fetchNewsError', error.response)
    return null
  }
}
export async function loadOtherNews ({ commit }, user) {
  commit('fetchOtherNewsBegin')
  try {
    const response = await httpClient.get(`${endPoint}`)
    let type = 0
    if (user.subscribeType) {
      type = await user.subscribeType
    }
    const data = await response.filter(element => element.type > type)
    commit('fetchOtherNewsSuccess', {
      data: data
    })
  } catch (error) {
    commit('fetchOtherNewsError', error.response)
    return null
  }
}
export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
