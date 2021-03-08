export function fetchOrdersBegin (state) {
  state.orders = []
  state.error = null
  state.isLoading = true
}

export function fetchOrdersSuccess (state, { data, total, currentPage, filter }) {
  state.orders = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchOrdersError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchOrderBegin (state) {
  state.order = {}
  state.isLoading = true
  state.error = null
}

export function fetchOrderSuccess (state, data) {
  state.order = data
  state.error = null
  state.isLoading = false
}

export function fetchOrderError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveOrderBegin (state) {
  state.error = null
  state.isSaved = false
  state.order = null
  state.isSaving = true
}

export function saveOrderSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveOrderError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
