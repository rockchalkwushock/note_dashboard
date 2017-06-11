import {
  createNote,
  CREATE_NOTE,
  editNote,
  EDIT_NOTE,
  deleteNote,
  DELETE_NOTE,
  fetchAll,
  FETCH_ALL_NOTES,
  noteError,
  fetchNote,
  FETCH_NOTE,
  NOTE_ERROR,
  noteState as initialState,
  notesReducer as reducer
} from '../modules'

describe('Notes Module', () => {
  let actual
  let expected
  describe('Reducer', () => {
    let state
    test('should yield default state object', () => {
      expect.assertions(4)
      actual = reducer((state = initialState), { type: 'unexpected' })
      expected = initialState
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('error', false)
      expect(actual).toHaveProperty('note', null)
      expect(actual).toHaveProperty('notes', [])
    })
    test('should return expected state object for CREATE_NOTE', () => {
      expect.assertions(2)
      actual = reducer((state = initialState), {
        type: CREATE_NOTE,
        payload: { note: {} }
      })
      expected = { ...state, note: {} }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('note', {})
    })
    test('should return expected state object for DELETE_NOTE', () => {
      expect.assertions(1)
      actual = reducer((state = initialState), {
        type: DELETE_NOTE
      })
      expected = { ...state }
      expect(actual).toMatchObject(expected)
    })
    test('should return expected state object for EDIT_NOTE', () => {
      expect.assertions()
      actual = reducer((state = initialState), {
        type: EDIT_NOTE,
        payload: { note: {} }
      })
      expected = { ...state, note: {} }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('note', {})
    })
    test('should return expected state object for FETCH_ALL_NOTES', () => {
      expect.assertions()
      actual = reducer((state = initialState), {
        type: FETCH_ALL_NOTES,
        payload: { notes: [] }
      })
      expected = { ...state, notes: [] }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('notes', [])
    })
    test('should return expected state object for FETCH_NOTE', () => {
      expect.assertions()
      actual = reducer((state = initialState), {
        type: FETCH_NOTE,
        payload: { note: {} }
      })
      expected = { ...state, note: {} }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('note', {})
    })
    test('should return expected state object for NOTE_ERROR', () => {
      expect.assertions()
      actual = reducer((state = initialState), {
        type: NOTE_ERROR
      })
      expected = { ...state, error: true }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('error', true)
    })
  })

  describe('Actions', () => {
    const data = {}

    test('should yield CREATE_NOTE & payload', () => {
      expect.assertions(3)
      actual = createNote(data)
      expected = { type: CREATE_NOTE, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', CREATE_NOTE)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield EDIT_NOTE & payload', () => {
      expect.assertions(3)
      actual = editNote(data)
      expected = { type: EDIT_NOTE, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', EDIT_NOTE)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield DELETE_NOTE', () => {
      expect.assertions(2)
      actual = deleteNote()
      expected = { type: DELETE_NOTE }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', DELETE_NOTE)
    })
    test('should yield FETCH_ALL_NOTES & payload', () => {
      expect.assertions(3)
      actual = fetchAll(data)
      expected = { type: FETCH_ALL_NOTES, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', FETCH_ALL_NOTES)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield FETCH_NOTE & payload', () => {
      expect.assertions(3)
      actual = fetchNote(data)
      expected = { type: FETCH_NOTE, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', FETCH_NOTE)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield NOTE_ERROR & payload', () => {
      expect.assertions(3)
      actual = noteError(data)
      expected = { type: NOTE_ERROR, payload: data }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', NOTE_ERROR)
      expect(actual).toHaveProperty('payload', data)
    })
  })
})
