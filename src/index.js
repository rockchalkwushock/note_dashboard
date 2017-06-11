import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux/es'
import { history, store } from './redux'
import Root from './Root'

const renderApp = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(Root)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root.js', () => {
    const NewApp = require('./Root').default
    renderApp(NewApp)
  })
}
