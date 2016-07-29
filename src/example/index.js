import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'material-design-lite/material.css';
import 'material-design-lite/material.min';
import React , {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {AppContainer } from 'react-hot-loader';
import {hashHistory } from 'react-router'
import {createStore} from 'redux';
import Root from './root';
import store from './store';

ReactDOM.render(
  <div>
    <Root store={store} history={hashHistory} />
  </div>,
    document.querySelector('.focus-search-example')
);

if (module.hot) {
  console.log('hot accepted.')
  module.hot.accept('./root', () => {
    console.log('Test hot')

    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    ReactDOM.render(

        <Root store={store} history={hashHistory} />,
        document.querySelector('.focus-search-example')
    );
  });
}
