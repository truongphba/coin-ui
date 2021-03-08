// import { httpClient } from 'src/api/http'
// import { cleanFilter } from 'src/utils/utils'
import data from 'src/data/news'

export async function loadNews ({ commit }) {
  commit('fetchNewsBegin')
  try {
    const response = data
    commit('fetchNewsSuccess', {
      data: response
    })
  } catch (error) {
    commit('fetchNewsError', error.response)
    return null
  }
}
export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
