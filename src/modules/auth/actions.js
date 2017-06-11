import { CREATE_USER, FETCH_ERROR, FETCH_USER, LOGOUT_USER } from './types'
import { AuthApi } from '../../utils'

const api = new AuthApi()

const createUser = data => ({
  type: CREATE_USER,
  payload: data
})

const fetchError = data => ({
  type: FETCH_ERROR,
  payload: data
})

const fetchUser = data => ({
  type: FETCH_USER,
  payload: data
})

const logoutUser = data => ({
  type: LOGOUT_USER,
  payload: data
})

const signInUser = values => async dispatch => {
  const data = await api.signIn(values)
  if (data.message) return dispatch(fetchError(data))
  return dispatch(fetchUser(data))
}

const signOutUser = () => dispatch => {
  const data = api.signOut()
  return dispatch(logoutUser(data))
}

const signUpUser = values => async dispatch => {
  const data = await api.signUp(values)
  if (data.message) return dispatch(fetchError(data))
  return dispatch(createUser(data))
}

export {
  createUser,
  fetchError,
  fetchUser,
  logoutUser,
  signInUser,
  signOutUser,
  signUpUser
}
