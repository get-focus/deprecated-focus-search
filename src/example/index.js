import React , {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {hashHistory } from 'react-router'
import {createStore} from 'redux';
import Root from './root';

ReactDOM.render(
  <div>
    <Root/>
  </div>,
    document.querySelector('.focus-redux-demo-app')
);

if (module.hot) {
  console.log('hot accepted.')
  module.hot.accept('./root', () => {
    console.log('Test hot')

    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    ReactDOM.render(
      <div>
        Focus-search
      </div>,
        document.querySelector('.focus-redux-demo-app')
    );
  });
}
