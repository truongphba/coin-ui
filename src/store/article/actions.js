import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/articles'

export async function loadArticles ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchArticlesBegin')
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
    commit('fetchArticlesSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchArticlesError', error.response)
    return null
  }
}

export async function loadArticle ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchArticleBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchArticleSuccess', response)
  } catch (error) {
    commit('fetchArticleError', error.response)
    return null
  }
}

export async function saveArticle ({ commit }, object) {
  commit('saveArticleBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, { data: object })
    } else {
      await httpClient.post(endPoint, { data: object })
    }
    commit('saveArticleSuccess')
  } catch (error) {
    commit('saveArticleError', error.response)
    return null
  }
}

export async function deleteArticle ({ commit }, id) {
  commit('deleteArticleBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteArticleSuccess')
  } catch (error) {
    commit('deleteArticleError', error.response)
    return null
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
