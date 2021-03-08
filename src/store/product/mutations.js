export function fetchProductsBegin (state) {
  state.products = []
  state.error = null
  state.isLoading = true
}

export function fetchProductsSuccess (state, { data, total, currentPage, filter }) {
  state.products = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchProductsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchProductBegin (state) {
  state.product = {}
  state.isLoading = true
  state.error = null
}

export function fetchProductSuccess (state, data) {
  state.product = data
  state.error = null
  state.isLoading = false
}

export function fetchProductError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveProductBegin (state) {
  state.error = null
  state.isSaved = false
  state.product = null
  state.isSaving = true
}

export function saveProductSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveProductError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteProductBegin (state) {
  state.error = null
  state.isDeleted = false
  state.product = null
  state.isDeleting = true
}

export function deleteProductSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteProductError (state, error) {
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
