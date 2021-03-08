import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/products'

export async function loadProducts ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchProductsBegin')
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
    commit('fetchProductsSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchProductsError', error.response)
    return null
  }
}

export async function loadProduct ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchProductBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchProductSuccess', response)
  } catch (error) {
    commit('fetchProductError', error.response)
  }
}

export async function saveProduct ({ commit }, object) {
  commit('saveProductBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, { data: object })
    } else {
      await httpClient.post(endPoint, { data: object })
    }
    commit('saveProductSuccess')
  } catch (error) {
    commit('saveProductError', error.response)
  }
}

export async function deleteProduct ({ commit }, id) {
  commit('deleteProductBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteProductSuccess')
  } catch (error) {
    commit('deleteProductError', error.response)
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
