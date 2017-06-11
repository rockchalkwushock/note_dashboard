import {
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  FETCH_ALL_NOTES,
  FETCH_NOTE,
  NOTE_ERROR
} from './types'
import { NotesApi } from '../../utils'

const api = new NotesApi()

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

const creatingNote = values => async dispatch => {
  const data = await api.create(values)
  if (data.message) return dispatch(noteError(data))
  return dispatch(createNote(data))
}

const deletingNote = id => async dispatch => {
  const data = await api.delete(id)
  if (data.message) return dispatch(noteError(data))
  return dispatch(deleteNote())
}

const editingNote = (values, id) => async dispatch => {
  const data = await api.edit(values, id)
  if (data.message) return dispatch(noteError(data))
  return dispatch(editNote(data))
}

const fetchingNote = id => async dispatch => {
  const data = await api.getNote(id)
  if (data.message) return dispatch(noteError(data))
  return dispatch(fetchNote(data))
}

const fetchingAllNotes = () => async dispatch => {
  const data = await api.getAll()
  if (data.message) return dispatch(noteError(data))
  return dispatch(fetchAll(data))
}

export {
  createNote,
  creatingNote,
  deleteNote,
  deletingNote,
  editNote,
  editingNote,
  fetchAll,
  fetchingAllNotes,
  fetchNote,
  fetchingNote,
  noteError
}
