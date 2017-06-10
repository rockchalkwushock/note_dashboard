import {
  authReducer as reducer,
  CREATE_USER,
  FETCH_ERROR,
  FETCH_USER,
  initialState,
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
})
