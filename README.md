# Tutorial de fonctionnement de la nouvelle API de forulaire

## De quoi part'on

Nous avons une API qui nous sert un objet JSON de la forme suivante

```json
{  
   "informations":{  
      "uuid":"58d94a87-b8e5-40af-b2d7-fb5ee8cb1270",
      "firstName":"Kian",
      "lastName":"Stroman"
   },
   "adress":[  
      {  
         "uuid":"1234",
         "city":"Cronafort"
      }
   ],
   "finance":{  
      "name":"Personal Loan Account",
      "amount":"157.00",
      "currency":"European Unit of Account 9(E.U.A.-9)",
      "moves":[  
         {  
            "transactionType":"withdrawal",
            "amount":"971.00"
         },
         {  
            "transactionType":"payment",
            "amount":"838.00"
         }
      ]
   }
}
```
L'utilisateur a donc :
- Des informations uuid, name, firstName
- Une adresse
- Des informations financières

L'objectif de ce tutorial est d'afficher chacune de ces données éventuellement un peu plus.

Nous voulons avoir les informations suivantes:
- Un bloc qui contient des données aggrégées sous la forme suivante: `Voici ${name} ${firstName} qui habite à ${ville} et disose de ${amount} sur son compte`
- Un bloc disponible en édition qui contient les infortmations de l'utilisateur
- Un bloc qui récapitule les informations financières et qui permet de les valider


## Initialisation de l'application

- Premièrement nous allons partir du starter kit qui est vide et volontairement ne contient ici que les fichiers de configuration.
- Le fichier `package.json` dispose d'une commande `start` que l'on peut appeller avec `npm start`
- Cette commande fait appel au script suivant:
```js
{
    "dev-server": {
    "command": "node ./server.js", //script appellé au start
    "env": { // L'ensemble des variables d'environnements réglées
      "DEV": true, // Est ce qu'on est en dev ou en prod
      "SOURCE_MAPS": false, // Active t'on les source maps
      "ENTRY_FILE_PATH": "./src/index", // Quel est le point d'entrée
      "PAGE_TITLE": "Focus entity dev page", // Le titre de la page
      "MINIMIFY": false, // Doit'on minifier les sources
      "API_PORT": 9999, // Le port de l'api
      "PACKAGE_JSON_PATH": "../",// Le chemin du package.json
      "ANCHOR_CLASS": "focus-redux-demo-app" // Quelle est la classe du container
    }
  }
}
```
- Lancer la commande `npm start` et rendez vous à [http://localhost:3000](http://localhost:3000)
- Il ne se passe rien

Nous allons donce créer un dans le fichier index.js les élements suivants
Le but est juste d'afficher un composant React.

```jsx
// On récupère react
import React from 'react';
import ReactDOM from 'react-dom';

// On crée le composant Application
const App = props =>
<div>
    /*{On injecte la props name dans le titre}*/
    <h1>Bienvenue {props.name}</h1>
</div>;

// La fonction ReactDOM est utilisée afin de rendre un composant React dans le DOM du navigateur. On doit lui fournir un conteneur HTML en second argument.
ReactDOM.render(
  // On créé le composant App et on lui fournit une props name
  <App name='pierre' />,
  // Conteneur HTML <div class='focus-redux-demo-app'></div>
  // Présent en amont
  document.querySelector('.focus-redux-demo-app')
);
```

## Brancher un routeur

L'objectif est maintenant de brancher un routeur dans notre application.

Nous allons créer deux pages.
Une page **Home** et qui est la page d'accueil de l'application et une page **User** qui sera la page de détail d'un utilisateur.
Afin de pouvoir avoir naviguer au sein de l'application, nous allons utiliser la librairie React routeur.

Tout d'abord il faut faire fonctionner notre app avec le routeur.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// importation des éléments de react-router.
import {Router, Route, hashHistory } from 'react-router'

// On crée le composant Application
const App = props => <div><h1>Bienvenue {props.name}</h1>{props.children}</div>;

ReactDOM.render(
  <Router history={hashHistory}><Route path='/' component={App} /></Router>,
  document.querySelector('.focus-redux-demo-app')
);
```
- Ensuite nous allons créer deux composants simples

```jsx
// views/home.js
import React from 'react';
const Home = props => <div>Home Page: {props.date}</div>;
export default Home;

// views/user/index.js
import React from 'react';
const User = props => <div>User: {props.name}</div>;
export default User;
```

- Maintenant nous allons injecter ces composants dans le routeur.

```jsx
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
```
> Maintenant on a un routeur et une application qui fonctionne pas trop mal
> Mais bon l'usage reste super basique

## Provider et connector

 Maintenant nous allons nous occuper d'initialiser l'application avec l'ensemble des `Providers`. Le concept de Provider utilise des fonctionnalités avancées de `React`. React dispose d'un mécanisme appellé le `context` qui permet de passer des informations de manière implicites à un arbre de composant. Si un parent décide de fournir des informations dans son contexte, tous les enfants peuvent les lire. **Attention l'usage du contexte n'est pas recommandé pour autre chose que pour des librairies qui cherchent à abstraire un concept**. Un provider sert donc à inserer des informations dans le contexte. Il va souvent de paire avec un `connecteur` qui lui sert à extraire des informations du contexte pour les fournir en `props` au composant fils. Le concept de connecteur repose sur le pattern de `High Order Component`.

- Nous allons ajouter en premier le Provider de `redux`, il sert à insérer dans le contexte le store applicatif. (On pourrait le mettre plus bas dans l'application) mais nous allons le mettre à la racine.

Le Provider de redux a donc besoin d'un store, qui est construit à partir des reducers. Un reducer étant une fonction, nous allons en créer un facilement.

- Première étape créer un store
```js
import {createStore} from 'redux';
const DEFAULT_STATE = {user: {name: 'pas de nom'}};
// On créé un store bidon qui a un state par défaut et le retourne.
// Un reducer est une fonction qui prend le state et le modifie
// Ici notre reducer est une fonction identité
const store = createStore((state = DEFAULT_STATE) => state);
```
- Deuxième étape, on fournit ce store au Provider qui entoure le reste de l'application.

```jsx
import {Provider as StoreProvider} from 'react-redux';
// on créé un composant root pour y voir plus clair
const Root = ({store}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
<StoreProvider store={store}>
    <Router history={hashHistory}>
      {/* On injecte comme composant d'application un composant connecté au store redux */}
      <Route path='/' component={App} >
        {/* Le composant IndexRoute signifie qui sera appellée par défaut*/}
        <IndexRoute component={Home} />
        {/* Les :id sert à fournir un paramètre à l'url on extrait les paramètres d'url via la props params*/}
        <Route path='user/:id' component={({params}) => <User id={params.id}/>} />
      </Route>
    </Router>
</StoreProvider>;

Root.propTypes = {store: PropTypes.object.isRequired};
// On passe le store en props à root
ReactDOM.render(
  <Root store={store} />,
  document.querySelector('.focus-redux-demo-app')
);
```

- Jusque ici rien de très compliqué, maintenant, nous allons connecter l'application (pour tester) au store redux via le connecteur.

```jsx
import {connect as connectToStore} from 'react-redux';
// On crée le composant Application
const App = props => <div style={{color: 'red'}}><h1>Bienvenue {props.name}</h1>{props.children}</div>;
// On le connect au store redux et on remplace `App` par `AppConnectToStore`
const AppConnectToStore = connectToStore(s => ({name: s.user.name}))(App);
```

- Ce qui nous donne finalement en code complet que l'on risque d'éclater en plusieurs fichiers


```jsx
import React , {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, hashHistory } from 'react-router'

import {createStore} from 'redux';
import {Provider as StoreProvider, connect as connectToStore} from 'react-redux';

/* Components */
import Home from './views/home';
import User from './views/user';

// On crée le composant Application
const App = props => <div style={{color: 'red'}}><h1>Bienvenue {props.name}</h1>{props.children}</div>;

const DEFAULT_STATE = {user: {name: 'pas de nom'}};
// On créé un store bidon qui a un state par défaut et le retourne.
const store = createStore((state = DEFAULT_STATE) => state);
const AppConnectToStore = connectToStore(s => ({name: s.user.name}))(App);

const Root = ({store}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
<StoreProvider store={store}>
    <Router history={hashHistory}>
      {/* On injecte comme composant d'application un composant connecté au store redux */}
      <Route path='/' component={AppConnectToStore} >
        {/* Le composant IndexRoute signifie qui sera appellée par défaut*/}
        <IndexRoute component={Home} />
        {/* Les :id sert à fournir un paramètre à l'url on extrait les paramètres d'url via la props params*/}
        <Route path='user/:id' component={({params}) => <User id={params.id}/>} />
      </Route>
    </Router>
</StoreProvider>;

Root.propTypes = {store: PropTypes.object.isRequired};

ReactDOM.render(
  <Root store={store} />,
  document.querySelector('.focus-redux-demo-app')
);
```

> C'est bon maintenant nous avons un store, une application connectée à ce store
> Rappel, pour le moment nous n'avons fait que du React, redux, et react routeur.

## Bon et maintenant on va initialiser la partie focus

- Afin d'initialiser l'application , nous avons besoin de définir les domaines et les définitions des entités.
- Pour cela nous mettons à disposition plusieurs `Providers`, par exemple pour les métadonnées, nous utilisons le `MetadataProvider`, à qui on doit fournir les domaines et les définitions des entitées de l'appication.

### Rappel les domaines

Les domaines servent à définir les domaines de valeurs des champs, ils portent une configuration ainsi qu'un ensemble de métadonnées.

On peut donc créer un fichier de config qui contiendra: les domaines.
Les domaines sont définis plus particulièrement [ici](http://kleegroup.github.io/focus-docs/tutorial/surcharger-form-input.html).
```js
export const domains = {
    DO_TEXT_MOYEN: {
        type: 'text',
        validator: [{
            type: 'string',
            options: {
                maxLength: 50
            }
        }]
    },
    DO_TEXTE_LONG: {
        type: 'text',
        validator: [{
            type: 'string',
            options: {
                maxLength: 200
            }
        }],
        formatter: value => value + ' - formaté'
    },
    DO_DATE : {
        formatter: date => date ? moment(date, format).format('DD/MM/YYYY') : ''
    },
    DO_CIVILITE: {
        type: 'text',
        validator: [{
            type: 'string',
            options: {
                maxLength: 200
            }
        }]
    }
};
```
