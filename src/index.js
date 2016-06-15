import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, hashHistory } from 'react-router'

/* Components */
import Home from './views/home';
import User from './views/user';

// On crée le composant Application
const App = props => <div style={{color: 'red'}}><h1>Bienvenue {props.name}</h1>{props.children}</div>;

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App} >
      {/* Le composant IndexRoute signifie qui sera appellée par défaut*/}
      <IndexRoute component={Home} />
      {/* Les :id sert à fournir un paramètre à l'url on extrait les paramètres d'url via la props params*/}
      <Route path='user/:id' component={({params}) => <User id={params.id}/>} />
    </Route>
  </Router>,
  document.querySelector('.focus-redux-demo-app')
);
