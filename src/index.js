import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux/es';
import { css } from 'glamor';
import { store } from './redux';
import Root from './Root';

// Global Styling Block
css.global('*', {
  boxSizing: 'border-box',
});

css.global('html, body', {
  height: '100vh',
  margin: '0',
  padding: '0',
  width: '100vw',
});

css.global('body', {
  backgroundColor: 'lightblue',
  maxWidth: '50em',
})

const renderApp = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(Root);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root.js', () => {
    const NewApp = require('./Root').default;
    renderApp(NewApp);
  });
}
