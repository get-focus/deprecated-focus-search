import React , {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {hashHistory } from 'react-router'
import {createStore} from 'redux';

import Root from './root';
import reducer from './reducer'
// On créé un store bidon qui a un state par défaut et le retourne.
const store = createStore(reducer);

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={hashHistory}/>
  </AppContainer>,
    document.querySelector('.focus-redux-demo-app')
);

if (module.hot) {
  console.log('hot accepted.')
  module.hot.accept('./root', () => {
    console.log('Test hot')

    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./root');
    ReactDOM.render(
      <AppContainer>
         <NextApp store={store} history={hashHistory}/>
      </AppContainer>,
        document.querySelector('.focus-redux-demo-app')
    );
  });
}
