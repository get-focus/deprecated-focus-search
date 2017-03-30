import './style';  //import demo styles
import '../style'; //import lib styles
//----------------
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer } from 'react-hot-loader';
import {hashHistory } from 'react-router'
import {createStore} from 'redux';
import Root from './root';
import store from './store';

import i18next from 'i18next';
import {intializeTranslation} from 'focus-application/translation';
import frFR from '../translation/fr-FR';

import {initializeStore} from './store';

intializeTranslation(i18next, 'fr-FR', [frFR]);

initializeStore();

import {getStore} from './store';
const applicationStore = getStore();
console.log('APPLICATION STORE', applicationStore);

console.log('Launching the app...');
const rootEl = document.querySelector('.focus-search-example')
ReactDOM.render(
    <div>
        <Root store={applicationStore} history={hashHistory} />
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

            <Root store={applicationStore} history={hashHistory} />,
            rootEl
        );
    });
}
