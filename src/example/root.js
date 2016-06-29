import React, {PropTypes} from 'react';
import {IndexRoute, Router, Route} from 'react-router';



/* Components */


const Root = ({store, history}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
<div>Bonjour</div>
;

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
