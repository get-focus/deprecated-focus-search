import React, {PropTypes} from 'react';
import {IndexRoute, Router, Route} from 'react-router';
import Home from './views/home';
import App from './app'
import {Provider as StoreProvider} from 'react-redux';
import 'babel-polyfill';
import {Provider as SearchProvider} from '../behaviours/search';

/* Components */


const Root = ({store, history}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
  <StoreProvider store={store}>
    <SearchProvider searchMetadata={{sortList: ['ouaaaaah', 'ceeeeest', 'biiiiiiiiennnnn'], groupList: ['ouaaaaah', 'ceeeeest', 'biiiiiiiiennnnn']}}>
      <Router history={history}>
        <Route path='/' component={App} >
          <IndexRoute component={Home}/>
        </Route>
      </Router>
    </SearchProvider>
  </StoreProvider>
;

Root.propTypes = {
  history: PropTypes.object.isRequired
};

export default Root;
