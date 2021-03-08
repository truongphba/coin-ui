import { httpClient } from 'src/api/http'
import { cleanFilter } from 'src/utils/utils'

const endPoint = '/dynamic-images'

export async function loadBanners ({
  commit,
  dispatch
}, {
  filter,
  page,
  limit
}) {
  commit('fetchBannersBegin')
  try {
    cleanFilter(filter)
    const currentPage = {
      page: page,
      limit: limit
    }
    const queryParams = new URLSearchParams({ ...filter, ...currentPage }).toString()
    const response = await httpClient.get(`${endPoint}?${queryParams}`)
    commit('fetchBannersSuccess', {
      data: response.data,
      total: response.total,
      currentPage: currentPage,
      filter: filter
    })
  } catch (error) {
    commit('fetchBannersError', error.response)
    return null
  }
}

export async function loadBanner ({
  commit,
  dispatch
}, id) {
  try {
    commit('fetchBannerBegin')
    const response = await httpClient.get(`${endPoint}/${id}`)
    commit('fetchBannerSuccess', response)
  } catch (error) {
    commit('fetchBannerError', error.response)
  }
}

export async function saveBanner ({ commit }, object) {
  commit('saveBannerBegin')
  try {
    if (object.id) {
      await httpClient.put(`${endPoint}/${object.id}`, { data: object })
    } else {
      await httpClient.post(endPoint, { data: object })
    }
    commit('saveBannerSuccess')
  } catch (error) {
    commit('saveBannerError', error.response)
  }
}

export async function deleteBanner ({ commit }, id) {
  commit('deleteBannerBegin')
  try {
    await httpClient.del(`${endPoint}/${id}`)
    commit('deleteBannerSuccess')
  } catch (error) {
    commit('deleteBannerError', error.response)
  }
}

export async function clearFilter ({ commit }) {
  commit('clearStateFilter')
}

export async function clearError ({ commit }) {
  commit('clearStateError')
}
