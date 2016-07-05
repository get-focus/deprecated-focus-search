import React, {PropTypes} from 'react';
import {compose} from 'redux';
import {connect as connectToStore} from 'react-redux';
import DevTools from './containers/dev-tools';



// On crée le composant Application
const App = props =>
  <div style={{color: 'blue'}}>
    Bienvenue
    <DevTools/>
    {props.children}
  </div>;

App.defaultProps = {
  name: 'Without name maybe not...'
}

App.propTypes = {
  name: PropTypes.string.isRequired
}
export default App;
