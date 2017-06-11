import {
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  FETCH_ALL_NOTES,
  FETCH_NOTE,
  NOTE_ERROR
} from './types'

const createNote = data => ({
  type: CREATE_NOTE,
  payload: data
})

const editNote = data => ({
  type: EDIT_NOTE,
  payload: data
})

const deleteNote = () => ({
  type: DELETE_NOTE
})

const fetchNote = data => ({
  type: FETCH_NOTE,
  payload: data
})

const fetchAll = data => ({
  type: FETCH_ALL_NOTES,
  payload: data
})

const noteError = data => ({
  type: NOTE_ERROR,
  payload: data
})

export { createNote, editNote, deleteNote, fetchAll, noteError, fetchNote }
