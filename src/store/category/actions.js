import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/categories'

export async function loadCategories ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchCategoriesBegin')
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
    commit('fetchCategoriesSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchCategoriesError', error.response)
    return null
  }
}

export async function loadCategory ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchCategoryBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchCategorySuccess', response)
  } catch (error) {
    commit('fetchCategoryError', error.response)
    return null
  }
}

export async function saveCategory ({ commit }, object) {
  commit('saveCategoryBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, { data: object })
    } else {
      await httpClient.post(endPoint, { data: object })
    }
    commit('saveCategorySuccess')
  } catch (error) {
    commit('saveCategoryError', error.response)
    return null
  }
}

export async function deleteCategory ({ commit }, id) {
  commit('deleteCategoryBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteCategorySuccess')
  } catch (error) {
    commit('deleteCategoryError', error.response)
    return null
  }
}

export async function loadAllParentCategories ({ commit, dispatch }) {
  commit('fetchAllParentCategoriesBegin')
  try {
    const response = await httpClient.get(`${endPoint}/allParent`)
    commit('fetchAllParentCategoriesSuccess', {
      data: response
    })
  } catch (error) {
    commit('fetchAllParentCategoriesError', error.response)
    return null
  }
}

export async function loadAllCategories ({ commit, dispatch }) {
  commit('fetchAllCategoriesBegin')
  try {
    const response = await httpClient.get(`${endPoint}/all`)
    commit('fetchAllCategoriesSuccess', {
      data: response
    })
  } catch (error) {
    commit('fetchAllCategoriesError', error.response)
    return null
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
