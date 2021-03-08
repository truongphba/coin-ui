export function getAuthToken () {
  return localStorage.getItem(process.env.TOKEN_NAME)
}

export function getTokenHeader () {
  return `Bearer ${getAuthToken()}`
}
