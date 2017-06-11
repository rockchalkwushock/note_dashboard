import { CREATE_USER, FETCH_ERROR, FETCH_USER, LOGOUT_USER } from './types'

export const initialState = {
  error: false,
  isFetched: false,
  isLoggedIn: false,
  token: null,
  user: null
}

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case CREATE_USER:
    case FETCH_USER:
      return {
        ...state,
        isFetched: true,
        isLoggedIn: true,
        token: payload.token,
        user: payload._id
      }
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        token: payload.token,
        user: payload._id
      }
    case FETCH_ERROR:
      return {
        ...state,
        error: true,
        isFetched: true,
        message: payload.message
      }
    default:
      return state
  }
}
