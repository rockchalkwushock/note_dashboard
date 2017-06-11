import { combineReducers } from 'redux/es'
import { routerReducer } from 'react-router-redux'

import { authReducer, notesReducer } from '../../modules'

export default combineReducers({
  auth: authReducer,
  notes: notesReducer,
  routing: routerReducer
})
