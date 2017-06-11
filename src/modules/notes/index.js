import {
  createNote,
  editNote,
  deleteNote,
  fetchAll,
  noteError,
  fetchNote
} from './actions'
import notesReducer, { initialState as noteState } from './reducer'
import {
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  FETCH_ALL_NOTES,
  FETCH_NOTE,
  NOTE_ERROR
} from './types'

export {
  createNote,
  CREATE_NOTE,
  deleteNote,
  DELETE_NOTE,
  editNote,
  EDIT_NOTE,
  fetchAll,
  FETCH_ALL_NOTES,
  fetchNote,
  FETCH_NOTE,
  noteError,
  NOTE_ERROR,
  noteState,
  notesReducer
}
