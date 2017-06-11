import {
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  FETCH_ALL_NOTES,
  FETCH_NOTE,
  NOTE_ERROR
} from './types'

export const initialState = {
  error: false,
  note: null,
  notes: []
}

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case CREATE_NOTE:
    case EDIT_NOTE:
    case FETCH_NOTE:
      return {
        ...state,
        note: payload.note
      }
    case DELETE_NOTE:
      return { ...state }
    case FETCH_ALL_NOTES:
      return {
        ...state,
        notes: payload.notes
      }
    case NOTE_ERROR:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
