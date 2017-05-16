import { combineReducers } from 'redux/es';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  routing: routerReducer,
})
