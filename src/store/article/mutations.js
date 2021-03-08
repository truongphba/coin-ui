export function fetchArticlesBegin (state) {
  state.articles = []
  state.error = null
  state.isLoading = true
}

export function fetchArticlesSuccess (state, { data, total, currentPage, filter }) {
  state.articles = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchArticlesError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchArticleBegin (state) {
  state.article = {}
  state.isLoading = true
  state.error = null
}

export function fetchArticleSuccess (state, Article) {
  state.article = Article
  state.error = null
  state.isLoading = false
}

export function fetchArticleError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveArticleBegin (state) {
  state.error = null
  state.isSaved = false
  state.article = null
  state.isSaving = true
}

export function saveArticleSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveArticleError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteArticleBegin (state) {
  state.error = null
  state.isDeleted = false
  state.article = null
  state.isDeleting = true
}

export function deleteArticleSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteArticleError (state, error) {
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
