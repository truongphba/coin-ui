import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/orders'

export async function loadOrders ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchOrdersBegin')
  try {
    cleanFilter(filter)
    const currentPage = {
      page: page,
      limit: limit
    }
    const queryParams = new URLSearchParams({
      ...filter,
      ...currentPage
    }).toString()
    const response = await httpClient.get(`${endPoint}?${queryParams}`)
    commit('fetchOrdersSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchOrdersError', error.response)
    return null
  }
}

export async function loadOrder ({ commit, dispatch }, id) {
  try {
    commit('fetchOrderBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchOrderSuccess', response)
  } catch (error) {
    commit('fetchOrderError', error.response)
  }
}

export async function saveOrder ({ commit }, { id, status }) {
  commit('saveOrderBegin')
  try {
    await httpClient.put(`${endPoint}/${id}`, { status: status })
    commit('saveOrderSuccess')
  } catch (error) {
    commit('saveOrderError', error.response)
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
