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
  LOGOUT_USER
} from '../auth'

describe('Auth Module', () => {
  let actual
  let expected
  describe('Reducer', () => {
    let state
    test('should yield default state object', () => {
      expect.assertions(5)
      actual = reducer((state = initialState), { type: 'unexpected' })
      expected = initialState
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('error', false)
      expect(actual).toHaveProperty('isFetched', false)
      expect(actual).toHaveProperty('isLoggedIn', false)
      expect(actual).toHaveProperty('token', null)
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
      // FIXME: payload should yield an error object or message.
      expect.assertions(3)
      actual = reducer((state = initialState), {
        type: FETCH_ERROR,
        payload: {}
      })
      expected = {
        ...state,
        error: true,
        isFetched: true
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('error', true)
      expect(actual).toHaveProperty('isFetched', true)
    })
    test('should return expected state object for LOGOUT_USER', () => {
      // FIXME: payload should yield an error object or message.
      expect.assertions(4)
      actual = reducer((state = initialState), {
        type: LOGOUT_USER,
        payload: {}
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
})
