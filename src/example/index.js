import './style';  //import demo styles
//----------------
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {hashHistory} from 'react-router'
import Root from './root';
import store from './store';

console.log('Launching the app...');
const rootEl = document.querySelector('.focus-search-example')
ReactDOM.render(
    <AppContainer>
        <Root store={store} history={hashHistory} />
    </AppContainer>,
    rootEl
);

if (module.hot) {
    console.log('--> HOT RELOAD ACCEPTED');
    module.hot.accept('./root', () => {
         console.log('--> HOT RELOAD');

        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('./root').default;
        ReactDOM.render(
            <AppContainer>
                <Root store={store} history={hashHistory} />
            </AppContainer>,
            rootEl
        );
    });
}
