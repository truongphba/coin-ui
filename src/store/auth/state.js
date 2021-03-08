export default {
  token: localStorage.getItem(process.env.TOKEN_NAME) || '',
  isLoading: false,
  error: null,
  user: {},
  isLoggedIn: false
}
