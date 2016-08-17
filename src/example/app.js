import React, {PropTypes} from 'react';
import {compose} from 'redux';
import {connect as connectToStore} from 'react-redux';
import DevTools from './containers/dev-tools';

// On crée le composant Application
const App = props =>
    <div>{props.children}</div>
;

App.displayName = 'Application';
export default App;
