import React, {PropTypes} from 'react';
import {IndexRoute, Router, Route} from 'react-router';
import Home from './views/home';
import App from './app'


/* Components */


const Root = ({store, history}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
    <Router history={history}>
      <Route path='/' component={App} >
        <IndexRoute component={Home}/>
      </Route>
    </Router>
;

Root.propTypes = {
  history: PropTypes.object.isRequired
};

export default Root;
