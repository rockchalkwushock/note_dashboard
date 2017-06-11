import configureMockStore from 'redux-mock-store'
import faker from 'faker'
import thunk from 'redux-thunk'
import NoteFactory from '../__mocks__/note.factory'
import UserFactory from '../__mocks__/user.factory'
import {
  createNote,
  creatingNote,
  CREATE_NOTE,
  editNote,
  editingNote,
  EDIT_NOTE,
  deleteNote,
  deletingNote,
  DELETE_NOTE,
  fetchAll,
  fetchingAllNotes,
  FETCH_ALL_NOTES,
  fetchNote,
  fetchingNote,
  FETCH_NOTE,
  noteError,
  NOTE_ERROR,
  noteState as initialState,
  notesReducer as reducer,
  signOutUser,
  signUpUser
} from '../modules'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Notes Module', () => {
  let actual
  let expected
  describe('Reducer', () => {
    let state
    test('should yield default state object', () => {
      expect.assertions(4)
      actual = reducer((state = initialState), {
        type: 'unexpected'
      })
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
        payload: {
          note: {}
        }
      })
      expected = {
        ...state,
        note: {}
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('note', {})
    })
    test('should return expected state object for DELETE_NOTE', () => {
      expect.assertions(1)
      actual = reducer((state = initialState), {
        type: DELETE_NOTE
      })
      expected = {
        ...state
      }
      expect(actual).toMatchObject(expected)
    })
    test('should return expected state object for EDIT_NOTE', () => {
      expect.assertions()
      actual = reducer((state = initialState), {
        type: EDIT_NOTE,
        payload: {
          note: {}
        }
      })
      expected = {
        ...state,
        note: {}
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('note', {})
    })
    test('should return expected state object for FETCH_ALL_NOTES', () => {
      expect.assertions()
      actual = reducer((state = initialState), {
        type: FETCH_ALL_NOTES,
        payload: {
          notes: []
        }
      })
      expected = {
        ...state,
        notes: []
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('notes', [])
    })
    test('should return expected state object for FETCH_NOTE', () => {
      expect.assertions()
      actual = reducer((state = initialState), {
        type: FETCH_NOTE,
        payload: {
          note: {}
        }
      })
      expected = {
        ...state,
        note: {}
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('note', {})
    })
    test('should return expected state object for NOTE_ERROR', () => {
      expect.assertions()
      actual = reducer((state = initialState), {
        type: NOTE_ERROR
      })
      expected = {
        ...state,
        error: true
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('error', true)
    })
  })
  describe('Actions', () => {
    const data = {}
    test('should yield CREATE_NOTE & payload', () => {
      expect.assertions(3)
      actual = createNote(data)
      expected = {
        type: CREATE_NOTE,
        payload: data
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', CREATE_NOTE)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield EDIT_NOTE & payload', () => {
      expect.assertions(3)
      actual = editNote(data)
      expected = {
        type: EDIT_NOTE,
        payload: data
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', EDIT_NOTE)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield DELETE_NOTE', () => {
      expect.assertions(2)
      actual = deleteNote()
      expected = {
        type: DELETE_NOTE
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', DELETE_NOTE)
    })
    test('should yield FETCH_ALL_NOTES & payload', () => {
      expect.assertions(3)
      actual = fetchAll(data)
      expected = {
        type: FETCH_ALL_NOTES,
        payload: data
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', FETCH_ALL_NOTES)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield FETCH_NOTE & payload', () => {
      expect.assertions(3)
      actual = fetchNote(data)
      expected = {
        type: FETCH_NOTE,
        payload: data
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', FETCH_NOTE)
      expect(actual).toHaveProperty('payload', data)
    })
    test('should yield NOTE_ERROR & payload', () => {
      expect.assertions(3)
      actual = noteError(data)
      expected = {
        type: NOTE_ERROR,
        payload: data
      }
      expect(actual).toMatchObject(expected)
      expect(actual).toHaveProperty('type', NOTE_ERROR)
      expect(actual).toHaveProperty('payload', data)
    })
  })
  describe('Async Action Creators', () => {
    let note
    let store
    let testNote
    let testNote2
    let testNote3
    let testUser
    let userObj
    beforeAll(async () => {
      store = mockStore()
      testNote = NoteFactory.generate()
      testNote2 = NoteFactory.generate()
      testNote3 = NoteFactory.generate()
      testUser = UserFactory.generate()
      userObj = await store.dispatch(signUpUser(testUser))
    })
    test('creatingNote() should yield the expected type & payload on success', async () => {
      try {
        actual = await store.dispatch(creatingNote(testNote))
        expect.assertions(6)
        expect(actual).toHaveProperty('type', CREATE_NOTE)
        expect(actual.payload).toHaveProperty('_id')
        expect(actual.payload).toHaveProperty('title', testNote.title)
        expect(actual.payload).toHaveProperty('text', testNote.text)
        expect(actual.payload).toHaveProperty('author', userObj.payload._id)
        expect(actual.payload).toHaveProperty('createdAt')
      } catch (e) {
        throw e
      }
    })
    test('creatingNote() should yield the expected type & payload on failure', async () => {
      try {
        actual = await store.dispatch(creatingNote(testNote.text))
        expect.assertions(2)
        expect(actual).toHaveProperty('type', NOTE_ERROR)
        expect(actual.payload).toHaveProperty('message', 'validation error')
      } catch (e) {
        throw e
      }
    })
    test('deletingNote() should yield the expected type & payload on success', async () => {
      try {
        note = await store.dispatch(creatingNote(testNote2))
        actual = await store.dispatch(deletingNote(note.payload._id))
        expect.assertions(1)
        expect(actual).toHaveProperty('type', DELETE_NOTE)
      } catch (e) {
        throw e
      }
    })
    test('deletingNote() should yield the expected type & payload on failure', async () => {
      try {
        actual = await store.dispatch(deletingNote())
        expect.assertions(2)
        expect(actual).toHaveProperty('type', NOTE_ERROR)
        expect(actual.payload).toHaveProperty('message')
      } catch (e) {
        throw e
      }
    })
    test('editingNote() should yield the expected type & payload on success', async () => {
      try {
        note = await store.dispatch(creatingNote(testNote3))
        actual = await store.dispatch(
          editingNote({ title: faker.lorem.text }, note.payload._id)
        )
        expect.assertions(6)
        expect(actual).toHaveProperty('type', EDIT_NOTE)
        expect(actual.payload).toHaveProperty('_id')
        expect(actual.payload).toHaveProperty('title')
        expect(actual.payload).toHaveProperty('text', testNote3.text)
        expect(actual.payload).toHaveProperty('author', userObj.payload._id)
        expect(actual.payload).toHaveProperty('createdAt')
      } catch (e) {
        throw e
      }
    })
    test('editingNote() should yield the expected type & payload on failure', async () => {
      try {
        note = await store.dispatch(creatingNote(testNote3))
        actual = await store.dispatch(
          editingNote({ title: 'Hello World' }, note.payload._id)
        )
        expect.assertions(2)
        expect(actual).toHaveProperty('type', NOTE_ERROR)
        expect(actual.payload).toHaveProperty('message')
      } catch (e) {
        throw e
      }
    })
    test('fetchingNote() should yield the expected type & payload on success', async () => {
      try {
        note = await store.dispatch(creatingNote(testNote2))
        actual = await store.dispatch(fetchingNote(note.payload._id))
        expect.assertions(6)
        expect(actual).toHaveProperty('type', FETCH_NOTE)
        expect(actual.payload).toHaveProperty('_id')
        expect(actual.payload).toHaveProperty('title', testNote2.title)
        expect(actual.payload).toHaveProperty('text', testNote2.text)
        expect(actual.payload).toHaveProperty('author')
        expect(actual.payload).toHaveProperty('createdAt')
      } catch (e) {
        throw e
      }
    })
    test('fetchingNote() should yield the expected type & payload on failure', async () => {
      try {
        actual = await store.dispatch(fetchingNote('123'))
        expect.assertions(2)
        expect(actual).toHaveProperty('type', NOTE_ERROR)
        expect(actual.payload).toHaveProperty('message')
      } catch (e) {
        throw e
      }
    })
    test('fetchingAllNotes() should yield the expected type & payload on success', async () => {
      try {
        actual = await store.dispatch(fetchingAllNotes())
        expect.assertions(2)
        expect(actual).toHaveProperty('type', FETCH_ALL_NOTES)
        expect(actual.payload).toHaveLength(10)
      } catch (e) {
        throw e
      }
    })
    test('fetchingAllNotes() should yield the expected type & payload on not signed in', async () => {
      try {
        await store.dispatch(signOutUser(testUser))
        actual = await store.dispatch(fetchingAllNotes())
        expect.assertions(2)
        expect(actual).toHaveProperty('type', FETCH_ALL_NOTES)
        expect(actual.payload).toEqual('Unauthorized')
      } catch (e) {
        throw e
      }
    })
  })
})
