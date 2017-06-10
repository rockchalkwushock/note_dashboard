import { combineReducers } from 'redux/es'
import { routerReducer } from 'react-router-redux'

import { authReducer } from '../../modules'

export default combineReducers({
  auth: authReducer,
  routing: routerReducer
})
