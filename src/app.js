import React, {PropTypes} from 'react';
import {compose} from 'redux';
import {connect as connectToStore} from 'react-redux';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';

// Ceci est un sélecteur de state, il sera localisé près de son reducer plus tard.
const userSelector = state => ({...state.user});

const StateDisplayer = connectToStore(s => s)(props => <pre><code>{JSON.stringify(props, null, 4)}</code></pre>)

// On crée le composant Application
const App = props =>
  <div style={{color: 'blue'}}>
    <h1>Bienvenue dans ce superbe tutoriel {props.name} </h1>
    {/* On récupère les définitions dans les props*/}
    {props.children}
    <StateDisplayer/ >
  </div>;

App.defaultProps = {
  name: 'Without name maybe not...'
}

App.propTypes = {
  name: PropTypes.string.isRequired
}
// On exporte le composant Application connecté au store redux.
export default compose(
                  connectToStore(userSelector),
                  connectToMetadata(['user','address','financialMove'])
               )(App);
