export function fetchBannersBegin (state) {
  state.banners = []
  state.error = null
  state.isLoading = true
}

export function fetchBannersSuccess (state, {
  data,
  total,
  currentPage,
  filter
}) {
  state.banners = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchBannersError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchBannerBegin (state) {
  state.banner = {}
  state.isLoading = true
  state.error = null
}

export function fetchBannerSuccess (state, data) {
  state.banner = data
  state.error = null
  state.isLoading = false
}

export function fetchBannerError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveBannerBegin (state) {
  state.error = null
  state.isSaved = false
  state.banner = null
  state.isSaving = true
}

export function saveBannerSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveBannerError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteBannerBegin (state) {
  state.error = null
  state.isDeleted = false
  state.product = null
  state.isDeleting = true
}

export function deleteBannerSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteBannerError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
