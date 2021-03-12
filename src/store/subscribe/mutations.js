export function saveSubscribeBegin (state) {
  state.error = null
  state.isSaved = false
  state.subscribe = null
  state.isSaving = true
}

export function saveSubscribeSuccess (state, subscribe) {
  state.isSaved = true
  state.isSaving = false
  state.subscribe = subscribe
}

export function saveSubscribeError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}
