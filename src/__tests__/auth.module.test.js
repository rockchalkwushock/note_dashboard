import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import UserFactory from '../__mocks__/user.factory'
import {
  authReducer as reducer,
  createUser,
  CREATE_USER,
  fetchError,
  FETCH_ERROR,
  fetchUser,
  FETCH_USER,
  initialState,
  logoutUser,
  LOGOUT_USER,
  signInUser,
  signOutUser,
  signUpUser
} from '../modules'

/**
 * Create middlewares & mockStore
 * for async action creator tests.
 */
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Auth Module', () => {
  let actual
  let expected
  describe('Reducer', () => {
    let state
    test('should yield default state object', () => {
      expect.assertions(6)
      actual = reducer((state = initialState), { type: 'unexpected' })
      expected = initialState
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('error', false)
      expect(actual).toHaveProperty('isFetched', false)
      expect(actual).toHaveProperty('isLoggedIn', false)
      expect(actual).toHaveProperty('token', null)
      expect(actual).toHaveProperty('user', null)
    })
    test('should return expected state object for FETCH_USER', () => {
      expect.assertions(5)
      actual = reducer((state = initialState), {
        type: FETCH_USER,
        payload: { _id: null, token: null }
      })
      expected = {
        ...state,
        isFetched: true,
        isLoggedIn: true,
        token: null,
        user: null
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('isFetched', true)
      expect(actual).toHaveProperty('isLoggedIn', true)
      expect(actual).toHaveProperty('token', null)
      expect(actual).toHaveProperty('user', null)
    })
    test('should return expected state object for CREATE_USER', () => {
      expect.assertions(5)
      actual = reducer((state = initialState), {
        type: CREATE_USER,
        payload: { _id: null, token: null }
      })
      expected = {
        ...state,
        isFetched: true,
        isLoggedIn: true,
        token: null,
        user: null
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('isFetched', true)
      expect(actual).toHaveProperty('isLoggedIn', true)
      expect(actual).toHaveProperty('token', null)
      expect(actual).toHaveProperty('user', null)
    })
    test('should return expected state object for FETCH_ERROR', () => {
      expect.assertions(4)
      actual = reducer((state = initialState), {
        type: FETCH_ERROR,
        payload: { message: 'validation error' }
      })
      expected = {
        ...state,
        error: true,
        isFetched: true,
        message: 'validation error'
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('error', true)
      expect(actual).toHaveProperty('isFetched', true)
      expect(actual).toHaveProperty('message', 'validation error')
    })
    test('should return expected state object for LOGOUT_USER', () => {
      expect.assertions(4)
      actual = reducer((state = initialState), {
        type: LOGOUT_USER,
        payload: { _id: null, token: null }
      })
      expected = {
        ...state,
        isLoggedIn: false,
        token: null,
        user: null
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('isLoggedIn', false)
      expect(actual).toHaveProperty('token', null)
      expect(actual).toHaveProperty('user', null)
    })
  })
  describe('Actions', () => {
    const data = {}

    test('should yield FETCH_USER & payload', () => {
      expect.assertions(3)
      actual = fetchUser(data)
      expected = { type: FETCH_USER, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', FETCH_USER)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield CREATE_USER & payload', () => {
      expect.assertions(3)
      actual = createUser(data)
      expected = { type: CREATE_USER, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', CREATE_USER)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield FETCH_ERROR & payload', () => {
      expect.assertions(3)
      actual = fetchError(data)
      expected = { type: FETCH_ERROR, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', FETCH_ERROR)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield LOGOUT_USER & payload', () => {
      expect.assertions(3)
      actual = logoutUser(data)
      expected = { type: LOGOUT_USER, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', LOGOUT_USER)
      expect(actual).toHaveProperty('payload', data)
    })
  })
  describe('Async Action Creators', () => {
    let store
    let testUser
    beforeAll(() => {
      store = mockStore()
      testUser = UserFactory.generate()
    })
    test('signUpUser() should yield the expected type & payload on success', async () => {
      try {
        actual = await store.dispatch(signUpUser(testUser))
        expect.assertions(3)
        expect(actual).toHaveProperty('type', CREATE_USER)
        expect(actual.payload).toHaveProperty('_id')
        expect(actual.payload).toHaveProperty('token')
      } catch (e) {
        throw e
      }
    })
    test('signUpUser() should yield the expected type & payload on failure', async () => {
      try {
        actual = await store.dispatch(signUpUser(testUser.email))
        expect.assertions(2)
        expect(actual).toHaveProperty('type', FETCH_ERROR)
        expect(actual.payload).toHaveProperty('message', 'validation error')
      } catch (e) {
        throw e
      }
    })
    test('signInUser() should yield the expected type & payload on success', async () => {
      try {
        actual = await store.dispatch(signInUser(testUser))
        expect.assertions(3)
        expect(actual).toHaveProperty('type', FETCH_USER)
        expect(actual.payload).toHaveProperty('_id')
        expect(actual.payload).toHaveProperty('token')
      } catch (e) {
        throw e
      }
    })
    test('signInUser() should yield the expected type & payload on failure', async () => {
      try {
        actual = await store.dispatch(signInUser(testUser.email))
        expect.assertions(2)
        expect(actual).toHaveProperty('type', FETCH_ERROR)
        expect(actual.payload).toHaveProperty('message', 'validation error')
      } catch (e) {
        throw e
      }
    })
    test('signOutUser() should yield the expected type & payload on success', async () => {
      try {
        actual = await store.dispatch(signOutUser())
        expect.assertions(3)
        expect(actual).toHaveProperty('type', LOGOUT_USER)
        expect(actual.payload).toHaveProperty('_id', null)
        expect(actual.payload).toHaveProperty('token', null)
      } catch (e) {
        throw e
      }
    })
  })
})
