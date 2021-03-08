export function fetchCategoriesBegin (state) {
  state.categories = []
  state.error = null
  state.isLoading = true
}

export function fetchCategoriesSuccess (state, { data, total, currentPage, filter }) {
  state.categories = data
  state.currentPage = currentPage
  state.filter = filter
  state.error = null
  state.total = total
  state.isLoading = false
}

export function fetchCategoriesError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchCategoryBegin (state) {
  state.category = {}
  state.isLoading = true
  state.error = null
}

export function fetchCategorySuccess (state, category) {
  state.category = category
  state.error = null
  state.isLoading = false
}

export function fetchCategoryError (state, error) {
  state.error = error
  state.isLoading = false
}

export function saveCategoryBegin (state) {
  state.error = null
  state.isSaved = false
  state.category = null
  state.isSaving = true
}

export function saveCategorySuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveCategoryError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteCategoryBegin (state) {
  state.error = null
  state.isDeleted = false
  state.category = null
  state.isDeleting = true
}

export function deleteCategorySuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteCategoryError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}

export function fetchAllParentCategoriesBegin (state) {
  state.allParentCategories = []
  state.error = null
  state.isLoading = true
}

export function fetchAllParentCategoriesSuccess (state, { data }) {
  state.allParentCategories = data
  state.error = null
  state.isLoading = false
}

export function fetchAllParentCategoriesError (state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchAllCategoriesBegin (state) {
  state.allCategories = []
  state.error = null
  state.isLoading = true
}

export function fetchAllCategoriesSuccess (state, { data }) {
  state.allCategories = data
  state.error = null
  state.isLoading = false
}

export function fetchAllCategoriesError (state, error) {
  state.error = error
  state.isLoading = false
}

export function clearStateFilter (state) {
  state.filter = {}
}

export function clearStateError (state) {
  state.error = null
}
