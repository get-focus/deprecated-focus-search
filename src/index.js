import React from 'react';
import ReactDOM from 'react-dom';



// On crée le composant Application
const App = props =>
<div>
  <h1>Bienvenue {props.name}</h1>
</div>;

ReactDOM.render(
  <App name='pierre' />, document.querySelector('.focus-redux-demo-app')
);
