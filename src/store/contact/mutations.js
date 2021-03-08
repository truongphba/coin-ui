export function fetchContactsBegin (state) {
  state.contacts = []
  state.error = null
  state.isLoading = true
}

export function fetchContactsSuccess (state, { data, total, currentPage, filter }) {
  state.contacts = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchContactsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
