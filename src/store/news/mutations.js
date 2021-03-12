export function fetchNewsBegin (state) {
  state.news = []
  state.error = null
  state.isLoading = true
}

export function fetchNewsSuccess (state, { data }) {
  state.news = data
  state.error = null
  state.isLoading = false
}

export function fetchNewsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchOtherNewsBegin (state) {
  state.otherNews = []
  state.error = null
  state.isLoading = true
}

export function fetchOtherNewsSuccess (state, { data }) {
  state.otherNews = data
  state.error = null
  state.isLoading = false
}

export function fetchOtherNewsError (state, error) {
  state.error = error
  state.isLoading = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
