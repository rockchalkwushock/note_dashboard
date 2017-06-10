import { CREATE_USER, FETCH_ERROR, FETCH_USER, LOGOUT_USER } from './types'

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

export { createUser, fetchError, fetchUser, logoutUser }
