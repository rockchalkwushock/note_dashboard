import { createUser, fetchError, fetchUser, logoutUser } from './actions'
import authReducer, { initialState } from './reducer'
import { CREATE_USER, FETCH_ERROR, FETCH_USER, LOGOUT_USER } from './types'

export {
  authReducer,
  createUser,
  CREATE_USER,
  fetchError,
  FETCH_ERROR,
  fetchUser,
  FETCH_USER,
  initialState,
  logoutUser,
  LOGOUT_USER
}
