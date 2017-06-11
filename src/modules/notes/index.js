import {
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
  creatingNote,
  CREATE_NOTE,
  deleteNote,
  deletingNote,
  DELETE_NOTE,
  editNote,
  editingNote,
  EDIT_NOTE,
  fetchAll,
  fetchingAllNotes,
  FETCH_ALL_NOTES,
  fetchNote,
  fetchingNote,
  FETCH_NOTE,
  noteError,
  NOTE_ERROR,
  noteState,
  notesReducer
}
