import './style';  //import demo styles
import {translate, init} from 'focus-core/translation';

//----------------
// Initialize translations configuration.
const i18nConfig = {
    resStore: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};

// Plugin initialization.
init(i18nConfig, () => {
    return console.info('Traduction Initialized !');
});


//----------------
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer } from 'react-hot-loader';
import {hashHistory } from 'react-router'
import {createStore} from 'redux';
import Root from './root';
import store from './store';

console.log('Launching the app...');
const rootEl = document.querySelector('.focus-search-example')
ReactDOM.render(
    <div>
        <Root store={store} history={hashHistory} />
    </div>,
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

            <Root store={store} history={hashHistory} />,
            rootEl
        );
    });
}
