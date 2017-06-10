import { applyMiddleware, createStore, compose } from 'redux/es'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk/es'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/es/createBrowserHistory'
import rootReducer from './reducers'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
let enhancers

if (process.env.NODE_ENV !== 'production') {
  enhancers = composeWithDevTools(applyMiddleware(...middlewares))
} else {
  enhancers = compose(applyMiddleware(...middlewares))
}

const store = createStore(rootReducer, undefined, enhancers)

export { history, store }
