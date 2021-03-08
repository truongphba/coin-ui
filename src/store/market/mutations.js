export function fetchMarketBegin (state) {
  state.currencies = []
  state.error = null
  state.isLoading = true
}

export function fetchMarketSuccess (state, { data }) {
  state.currencies = JSON.parse(JSON.stringify(data))
  state.error = null
  state.isLoading = false
}

export function fetchMarketError (state, error) {
  state.error = error
  state.isLoading = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
