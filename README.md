# Tutorial de fonctionnement de la nouvelle API de gestion des entités et des pages
 Nous avons conscience qu'il reste quelques petites erreurs, nous avons fait ce tutoriel avec plein d'amour, n'hésitez pas à contribuer pour nous aider =) ! 
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

L'objectif de ce tutoriel est d'afficher chacune de ces données, éventuellement un peu plus.

Nous voulons avoir les informations suivantes:
- Un bloc qui contient des données aggrégées sous la forme suivante: `Voici ${name} ${firstName} qui habite à ${ville} et disose de ${amount} sur son compte`
- Un bloc disponible en édition qui contient les infortmations de l'utilisateur
- Un bloc qui récapitule les informations financières et qui permet de les valider

Un peu comme ceci

![img_1618](https://cloud.githubusercontent.com/assets/286966/16341155/0e5c798c-3a2c-11e6-98e7-276130a236d6.JPG)


## Initialisation de l'application

- Premièrement nous allons partir du starter kit qui est vide et qui ne contient volontairement que les fichiers de configuration.
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

> Les fonctions pures ou stateless servent à créer des composants simplement, sans cycle de vie et sans state.
> Par défaut il est recommandé d'essayer d'écrire chaque composant sous forme de fonction pure.
> Voir la doc de [react](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)

## Brancher un routeur

L'objectif est maintenant de brancher un routeur dans notre application.

> Rappel: le routeur est ici afin de gérer le changement de page au sein de la spa.

![slack_for_ios_upload_720 3](https://cloud.githubusercontent.com/assets/286966/16158384/45c1671c-34bd-11e6-8cc8-7d34085ee7b0.jpg)



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

 Maintenant nous allons nous occuper d'initialiser l'application avec l'ensemble des `Providers`. Le concept de Provider utilise des fonctionnalités avancées de `React`. React dispose d'un mécanisme appellé le `context` qui permet de passer des informations de manière implicite à un arbre de composant. Si un parent décide de fournir des informations dans son contexte, tous les enfants peuvent les lire. **Attention l'usage du contexte n'est pas recommandé pour autre chose que pour des librairies qui cherchent à abstraire un concept**. Un provider sert donc à inserer des informations dans le contexte. Il va souvent de paire avec un `connecteur` qui lui sert à extraire des informations du contexte pour les fournir en `props` au composant fils. Le concept de connecteur repose sur le pattern de `High Order Component`.

- Nous allons ajouter en premier le Provider de `redux`, il sert à insérer le store applicatif dans le contexte. (On pourrait le mettre plus bas dans l'application) mais nous allons le mettre à la racine.

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

const DEFAULT_STATE = {user: {name: 'Pierre Besson'}};
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

- Nous allons maintenant sortir la partie application du composant root dans un fichier `src/app.js`.


```jsx
import React, {PropTypes} from 'react';
import {connect as connectToStore} from 'react-redux';

// Ceci est un sélecteur de state, il sera localisé près de son reducer plus tard.
const userSelector = state => ({...state.user});

// On crée le composant Application
const App = props =>
  <div style={{color: 'blue'}}>
    <h1>Bienvenue {props.name} </h1>
    {props.children}
  </div>;

App.defaultProps = {
  name: 'Without name maybe not...'
}

App.propTypes = {
  name: PropTypes.string.isRequired
}
// On exporte le composant Application connecté au store redux.
export default connectToStore(userSelector)(App);

```

nous avons donc un composant `Root` qui va ressembler à ceci:

```jsx
import React, {PropTypes} from 'react';
import {IndexRoute, Router, Route} from 'react-router'
import {Provider as StoreProvider} from 'react-redux';
/* Components */
import App from './app';
import Home from './views/home';
import User from './views/user';

const Root = ({store, history}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
<StoreProvider store={store}>
    <Router history={history}>
      {/* On injecte comme composant d'application un composant connecté au store redux */}
      <Route path='/' component={App} >
        {/* Le composant IndexRoute signifie qui sera appellée par défaut*/}
        <IndexRoute component={Home} />
        {/* Les :id sert à fournir un para  sssssssmètre à l'url on extrait les paramètres d'url via la props params*/}
        <Route path='user/:id' component={({params}) => <User id={params.id}/>} />
      </Route>
    </Router>
</StoreProvider>;

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
```

- Dernier point, nous allons également passer la partie reducer qui sert à construire le store dans un autre fichier `src/reducer/index.js`.

```js
const DEFAULT_STATE = {user: {name: 'pas de nom', date: new Date().getTime(), bababa: 'dddididid'}};
const rootReducer = (state = DEFAULT_STATE) => state

export default rootReducer;
```

On a donc dans le composant `root` pour le store:
```js
import reducer from './reducer';
//...
// On créé un store bidon qui a un state par défaut et le retourne.
const store = createStore(reducer);
```

## Maintenant que la structure initiale est terminée, on va initialiser la partie focus

> A noter que cette partie n'est certainement pas présente dans le starter kit dans la mesure où tout est prêt pour un démarrage rapide.

- Afin d'initialiser l'application , nous avons besoin de définir les domaines et les définitions des entités.
- Pour cela nous mettons à disposition plusieurs `Providers`, par exemple pour les métadonnées, nous utilisons le `MetadataProvider`, à qui on doit fournir les domaines et les définitions des entitées de l'appication.

### Rappel les domaines

Les domaines servent à définir les domaines de valeurs des champs, ils portent une configuration ainsi qu'un ensemble de métadonnées.

On peut donc créer un fichier de config qui contiendra: les domaines.
Les domaines sont définis plus particulièrement [ici](http://kleegroup.github.io/focus-docs/tutorial/surcharger-form-input.html).

> Pour information, vous pouvez insérer ce que vous souhaitez dans les domaines afin de le récupérer dans le composant cible.
> Je vous invite à lire la superbe documentation dans le connecteur de metadata [ici](https://github.com/get-focus/focus-redux/blob/master/src/behaviours/metadata.js#L71) :+1
> L'objectif de ces metadonnées et d'être fournies au composant générique `Field`

![slack for ios upload](https://cloud.githubusercontent.com/assets/286966/16376434/7e7d06c4-3c60-11e6-9f4e-5b263df071b2.jpg)


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
        formatter: value => value + ' - formaté',
        validationOnBlur: false

    },
    DO_DATE : {
        formatter: date => date ? moment(date, format).format('DD/MM/YYYY') : '',
        InputComponent: DateComponent
    },
    DO_CHECKBOX = {
      type: 'boolean',
      InputComponent: Checkbox,
      DisplayComponent: DisplayCheckbox
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
Nous devons également définir les entités de l'application.
Nous allons créer un fichier `config/entity-definitions` qui va nous permettre de définir l'ensemble des domaines des champs de l'application. Cette partie est normalement générée depuis le modèle de données ou depuis l'API (c'est certainement la dernière option qui est préférable afin de coller au contrat d'échange entre l'application et le serveur).

```js
export const user = {
  uuid: {
    domain: 'DO_ID',
    required: true
  },
  firstName: {
    domain: 'DO_TEXTE',
    required: true
  },
  lastName: {
    domain: 'DO_TEXTE',
    required: true
  }
}

export const address = {
  uuid: {
    domain: 'DO_ID',
    required: true
  },
  city: {
    domain: 'DO_TEXTE',
    required: true
  }
}

export const finance = {
  name:  {
    domain: 'DO_TEXTE',
    required: true
  }
  amount:  {
    domain: 'DO_AMOUNT',
    required: true
  }
  currency:  {
    domain: 'DO_SYMBOL',
    required: true
  }
  moves:{
    child: 'financialMove'
  }
}

export const financialMove = {
  transactionType: {
    domain: 'DO_CODE',
    required: true
  },
  amount: {
    domain: 'DO_MONTANT',
    required: true
  }
}
```

- Maintenant que nous avons accès à ces définitions, nous allons les initialiser dans l'application.
- De la même manière que nous avons enrobbé le routeur d'un provider de store, nous allons ajouter le provider de métadonnées.

- Nous allons ajouter les lignes suivantes afin de fournir à l'ensemble des composants fils le contenu des domaines et des définitions.

```jsx
import {Provider as MetadataProvider} from 'focus-redux/behaviours/metadata';
import * as definitions from './config/entity-definitions';
import * as domains from './config/domains';

// ...
<StoreProvider store={store}>
  <MetadataProvider definitions={definitions} domains={domains}>
    <Router history={history}>
      {/* On injecte comme composant d'application un composant connecté au store redux */}
        {/* Le composant IndexRoute signifie qui sera appellée par défaut*/}
        <Route path='/' component={App} >
        <IndexRoute component={Home}/>
        {/* Les :id sert à fournir un para  sssssssmètre à l'url on extrait les paramètres d'url via la props params*/}
        <Route path='user/:id' component={({params}) => <User id={params.id}/>} />
      </Route>
    </Router>
  </MetadataProvider>
</StoreProvider>;
```

- Nous allons maintenant nous connecter au provider de metadonnées.
- Par exemple si nos nous plaçons dans le composant application qui est déjà connecté au store.

```jsx
import {compose} from 'redux'; // Pour composer les connecteurs
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
// ...
// On crée le composant Application
const App = props =>
  <div style={{color: 'blue'}}>
    <h1>Bienvenue dans ce superbe tutoriel {props.name} </h1>
    {/* On récupère les définitions dans les props*/}
    {JSON.stringify(props.definitions)}
    {props.children}
  </div>;
// ...
// On exporte le composant Application connecté au store redux.
export default compose(
  connectToStore(userSelector),
  connectToMetadata(['user','address','financialMove'])
)(App);
```
> En pratique nous n'allons pas connecter le composant d'application au store. Nous allons plutôt travailler sur une page qui va afficher les éléments prévus.

## Faire une page avec la nouvelle manière de gérer le form.

- Avant de commencer, pour pouvoir utiliser le form il faut placer d'autres provider
- FieldHelpersProvider => Qui va nous servir à pouvoir récupérer les helper de form dans chacun des composantrs
- MasterDataProvider => Qui va nous servir à injecter des listes de références dans certaines parties de l'application.

Dans le composant root.

```jsx
import {Provider as MetadataProvider} from 'focus-redux/behaviours/metadata';
import {Provider as FieldHelpersProvider} from 'focus-redux/behaviours/field';
import {Provider as MasterDataProvider} from 'focus-redux/behaviours/master-data';
//...
const Root = ({store, history}) => /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
<StoreProvider store={store}>
  <MetadataProvider definitions={definitions} domains={domains}>
    <FieldHelpersProvider >
      <MasterDataProvider>
        <Router history={history}>
          {/* On injecte comme composant d'application un composant connecté au store redux */}
            {/* Le composant IndexRoute signifie qui sera appellée par défaut*/}
            <Route path='/' component={App} >
            <IndexRoute component={Home}/>
            {/* Les :id sert à fournir un paramètre à l'url on extrait les paramètres d'url via la props params*/}
            <Route path='user/:id' component={({params}) => <User id={params.id}/>} />
          </Route>
        </Router>
      </MasterDataProvider>
      </FieldHelpersProvider>
  </MetadataProvider>
</StoreProvider>;
```

# Dernier point avant de se lancer on va créer un store un peu plus avancé

## Créer un store redux avec Focus

### Le concept de store dans redux

Afin d'utiliser les reducers que vous avez pu écrire, il est nécessaire d'utiliser la méthode `createStore` de redux qui est documenté [ici](http://redux.js.org/docs/api/createStore.html).


La création d'un store sert à :
- fournir une méthode pour dispatcher une action `dispatch`
- fournir une méthode pour s'abonner à des changements sur un store.
- Enregistrer l'arbre de reducer que vous avez produit afin que lorsqu'une action soit dispatchée, le nouveau state soit calculable via les reducers.
- Fournir les **enhancers** de store qui sont surtout les middlewares qui on des buts variés et qu'il faut utiliser avec parcimonie.


```
dispatch(action) => middleware(action) => state = reducers(previousState, action)
```

> Petit apparté sur les middleware on a des middlewares dits :
> - **third-party :** qui vont ammener à redux des fonctionnalités comme le log des actions, les devtools.
> - **custom :** dont le rôle est de réagir à certaines actions et d'en dispatcher de nouvelles lors de.

### Créer un store avec les comportements focus

Afin de vous aider au mieux au sein des projets nous avons préparé un certain nombre de choses déjà prévue dans le store. Nous avons donc crée une méthode `createStoreWithFocus` qui ajoute les éléments suivants. `createStoreWithFocus(reducers, customMiddlewares, otherEnHancers) => createStore(reducers + focusReducers,customMiddlewares + focusmiddleWare + otherEnHancers + enhancersFocus)`

Voici ce que le `createStoreWithFocus` manipule.

- `reducers: {dataSet, customData}`
  - `dataSet` qui va contenir les reducers de données, qui seront populés lors des chargement de données
  - `customData` qui contiendra un morceau de state propre au projet qui sera libre en terme de contenu
  -  `...focusReducers` qui sont l'ensemble des reducers prévus par focus et prévus pour réagir aux différents connecteurs / providers / middlewares que nous proposons.
    - `master-data`: les reducers responsables de stocker les listes de références
    - `metadata`: les reducers responsables de stocker les domaines et les définitions
    - `form` qui contiendra la partie du state propre à chaque formulaire ou bloc de données indépendants. Ce morceau de state sera populé par les middlewares à chaque action comme chargement des données, sauvegarde des données, validation, saisie dans le champ, sortie de champ. Cette partie de state contient également l'ensemble des informations de chaque field de l'application comme : est-ce que le champ a changé, quel est sa valeur formattée, est ce qu'il est en édition, est ce qu'il a une erreur.
    > Pour plus d'informations, n'hésithez pas à aller voir la forme du state de chaque [form](https://github.com/get-focus/focus-redux/blob/6cb7b32f50caaa8ebbd093b1e24459a1b9e2f3b5/src/reducers/form.js#L22) et de chaque [field](https://github.com/get-focus/focus-redux/blob/6cb7b32f50caaa8ebbd093b1e24459a1b9e2f3b5/src/reducers/form.js#L31)

  - `...otherReducers` qui contiendra d'autres reducers que vous pouvez fournir pour les extensions par exemple.
- `middleware {customMiddlewares, formMiddleware, fieldMiddleware, thunkMiddleware}`
  - `customMiddlewares` l'ensemble des middleware servant à faire un comportement métier _custom_ au projet. (Mettre à jour un champ en fonction d'un autre par exemple, un exemple détaillé est dans ce tutoriel)
  - `formMiddleware` le middleware responsable de la population du state propre au formulaire
  - `fieldMiddleware` le middleware responsable de la population de chaque field et de la réaction à chaque frappe, chaque changement de focud...
  - `thunkMiddleware` sert à pouvoir appeller des actions asynchrones. Voir [ici](https://github.com/gaearon/redux-thunk) pour de plus amples informations.
- `otherEnHancers` qui sert à fournir des enhancers à redux, typiquement le fait d'avoir des devtools redux.

### Exemple

Dans votre projet, vous allez créer un fichier `store.js` qui contiendra les éléments suivants:

```
import createStoreWithFocus from 'focus-redux/store/create-store';
import dataSetReducer from '../../src/reducer';
import {amoutToUpperCaseMiddleware, errorFieldMiddleware, ownActiondMiddleware} from '../../src/middleware/user-middleware';
import DevTools from '../containers/dev-tools'

const store = createStoreWithFocus(
  // Le reducer de données
  {dataSet: dataSetReducer},
  // Le tableau de middleware custom
  [errorFieldMiddleware, amoutToUpperCaseMiddleware,ownActiondMiddleware], [DevTools.instrument()] // on ajoute les devtools focus
);

export default store;
```

Ensuite ce store sera fournie au `Provider` de store exposé par [react-redux](https://github.com/reactjs/react-redux).


> Le socle applicatif est maintenant prêt.
> On y va, on peut passer aux exemples !


# Votre premier formulaire

Commençons par quelque chose de simple, on va afficher simplement les informations d'un User, avec son prénom, son nom, et l'id.

Il y a alors quatre étapes pour réaliser cela. La vue, les actions, les services et les reducers.

# La vue

Nous avons besoin d'un composant React : User.

```jsx
import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadUserAction, saveUserAction} from '../../actions/user-actions';

// Les boutons de de save et de load sont maintenant portés par le panel, attention de ne pas utiliser celui de Focus-components
import Panel from 'focus-redux/components/panel';
import {compose} from 'redux';

class User extends Component {
    componentWillMount() {
        const {id, load} = this.props;
        // Load de l'entité !
        load({id});
    }

    render() {
        // Via le connectToFieldHelpers nous pouvons récupérer les fieldFor des props
        const {fieldFor} = this.props;
        return (
            <Panel title='User' {...this.props}>
                {fieldFor('uuid', {entityPath: 'user'})}
                {fieldFor('firstName', {entityPath: 'user'})}
                {fieldFor('lastName', {entityPath: 'user'})}
            </Panel>
        );
    }
};

User.displayName = 'User';

//FormKey : Elle doit être unique pour chaque Form, elle nous permet d'avoir un discrinant !
//Definit les definitions relatives au form en question, vous pouvez en mettre autant que vous voulez !
// LoadAction, elle porte bien son nom ! Elle se trouve maintenant dans les props sous le nom de .... load
// SaveAction, elle porte également très bien sont nom et se trouve également dans les props sont le nom de ... save !!
// nonValidatedFields : tableau qui permet de ne pas prendre en compte un champs required d'une définition
const formConfig = {
    formKey: 'userForm',
    entityPathArray: ['user'],
    loadAction: loadUserAction,
    saveAction: saveUserAction,
    nonValidatedFields: ['user.firstName']
};

// Il faut connecter notre composant aux différents providers
// Les domaines + définitions
// Puis pour le form
// et enfin le FieldHelpers
// Attention l'ordre des connecteurs est important !
const ConnectedUserForm = compose(
    connectToMetadata(['user']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(User);

//Attention de toujours exporter le composant connecté ... ( oui il m'est arrivé de faire l'erreur, et alors ?! )
export default ConnectedUserForm;


```

Expliquons le pas à pas !

### Création d'un composant :
 Rien de bien nouveau sous le soleil, je vous invite à aller sur le site de React en cas de doute subsistant. Notre composant est un composant React des plus classiques.

> A noter, le composant Panel utilisé, est le panel disponible dans Focus-redux et ainsi c'est lui qui pose les boutons save et load du panel d'où l'intérêt de lui passer `{...otherProps}`

 > Dans l'immédiat, et pour une meilleure clarté de ce tutoriel, le composant User est une classe qui possède la logique ( load ... ) et l'affichage. En pratique, nous vous encourageons de séparer cette logique de l'affichage afin d'utiliser des composants pures, pour plus de performance, de beauté !

```jsx
import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadUserAction, saveUserAction} from '../../actions/user-actions';

import Panel from 'focus-redux/components/panel';
import {compose} from 'redux';

const User = ({fieldFor, ...otherProps}) => (
  <Panel title='User' {...otherProps}>
      {fieldFor('uuid', {entityPath: 'user'})}
      {fieldFor('firstName', {entityPath: 'user'})}
      {fieldFor('lastName', {entityPath: 'user'})}
  </Panel>
)


class SmartUser extends Component {
    componentWillMount() {
        const {id, load} = this.props;
        // Et voila un load !
        load({id});
    }

    render() {
        const {fieldFor} = this.props;
        return (
          <User fieldFor={fieldFor} { ...this.props}/>
        );
    }
};

User.displayName = 'SmartUser ';

const formConfig = {
    formKey: 'userForm',
    entityPathArray: ['user'],
    loadAction: loadUserAction,
    saveAction: saveUserAction,
    nonValidatedFields: ['user.firstName']
};

const ConnectedUserForm = compose(
    connectToMetadata(['user']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(SmartUser );

export default ConnectedUserForm;


```

### Connection au provider :
Avant toute chose, pour petit rappel, cette connexion est possible grâce au provider qui ont été mis précédemment autour de vos composants, ainsi que la création du store ( via le createStoreWithFocus ). Dans notre cas nous allons connecter notre composant :

- aux metaDonnées ( les définitions et les domaines )

- aux fonctionnalités disponibles du Form via un objet de config

- aux fieldHelpers qui va exposer les fonctionnnalités de fieldFor ( par exemple .... )

Le `connectToForm` est l'élément principal de cet écran, il attend un objet spécifique :

``` jsx
const formConfig = {
//FormKey : Elle doit être unique pour chaque Form, elle nous permet d'avoir un discrinant !
    formKey: 'userForm',
//Definit les definitions relatives au form en question, vous pouvez en mettre autant que vous voulez !
    entityPathArray: ['user'],
// Load Action, elle porte bien son nom ! Elle se trouve maintenant dans les props sous le nom de .... load    
    loadAction: loadUserAction,
// Save Action, elle porte également très bien sont nom et se trouve également dans les props sont le nom de ... save !!    
    saveAction: saveUserAction,
    nonValidatedFields: ['user.firstName']
};
```
**Le tableau de nonValidatedFields :** Ce tableau permet, dans le cas où l'entity definition de votre entity utilisé dans le formulaire a des champs que vous ne souhaitez pas valider.  Nous préconisons une utilisation occasionnelle de ce tableau. En effet si cela devient systématique, nous recommandons de faire des objets non-persistés en base spécifique pour le formulaire en question.  
Pour la forme, il suffit de lui passer le champs en question de l'entity via une notation simple : 'entity.nomDuChamps'. Pour les champs listes, même principe mais avec un tableau pour chaque champs de l'entité de la liste. Voici un exemple complet : `nonValidatedFields: ['user.uuid', {'user.childs': ['firstName']}]`

> Pour information ce connecteur utilise le `connect` au store de redux afin de récupérer le noeud form du store. Pour en savoir plus sur le shape du store, n'hésitez pas à aller voir la documentation liée.

> Votre composant est maintenant connecté aux différents provider dont vous avez besoin, n'oubliez pas que c'est le composants connecté qu'il faut exporté !

### Votre composant est prêt !

Et voila rien de plus simple maintenant, tout est dans vos props ! Le fieldFor, selectFor et ListFor, le save, le load et compagnie !
Vous pouvez maintenant construire votre vue avec des fieldFor comme ça par exemple :
`{fieldFor('uuid', {entityPath: 'user'})}`

Comme il est possible d'associer plusieurs entityPath à un form, il devient nécessaire d'indiquer pour chaque fieldFor l'entityPath a laquel il appartient ! Il est possible également de surcharger toutes les fonctions `onChange` ou `onBlur` :
`{fieldFor('uuid', {onChange: () => {console.log('onChange changé !')}, entityPath: 'user'})}`

Dans le cas ou votre formulaire n'est associé qu'à une seule entité, il n'est pas nécessaire d'indiquer l'entityPath à chaque fois.

> Pour mettre ce composant en musique, comme vous l'avez sans doute remarqué, nous avons du importer des actions ! Pas de panique, c'est la prochaine partie !  
> Si vous souhaitez ne faire que de l'affichage, l'action save n'est pas obligatoire.

# Les actions  :

Nous avons deux actions à écrire le load et le save. Il est alors possible d'utiliser l'actionBuilder. Nous préconisons l'utilisation de ce dernier, mais ce n'est pas une obligation.

```jsx
import {actionBuilder} from 'focus-redux/actions/entity-actions-builder';
import {loadUser, saveUser} from '../services/user-service';

const _loadUserAction = actionBuilder({names: ['user'], type: 'load', service: loadUser});
export const loadUserTypes = _loadUserAction.types;
export const loadUserAction = _loadUserAction.action;

const _saveUserAction = actionBuilder({names: ['user'], type: 'save', service: saveUser});
export const saveUserTypes = _saveUserAction.types;
export const saveUserAction = _saveUserAction.action;
```

Et voilà de belles actions ! Plusieurs points à expliquer mais avant tout si vous n'êtes pas encore au point sur les actions, les reducers, le store redux, je vous invite grandement à retourner voir la documentation de redux  à ce sujet ! Vous avez trois choses à renseigner ici :

- Les `names `:  c'est un tableau qui correspond aux nodes du store redux concerné par votre action ( dans notre cas nous avons mis `user`), il est tout a fait possible d'en mettre plusieurs pour mettre à jour plusieurs noeuds ( voir l'exemple à ce sujet )

- Le type : Toute action doit avoir un type, load ou save.
- Le service : Fonction qui fait appel aux serveurs.

> Vous avez ainsi en retour, une action que vous allez utiliser dans votre vue, ainsi que des types qui seront utilisés dans vos reducers ( expliqué juste en dessous ! )  


#Les services

Les services fonctionnent exactement de la même façon qu'avant, ne perdons pas de temps inutilement.
On rappellera juste que les services sont des promesses, pour plus d'informations voici la documentation :
https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise.

#Les reducers

Pour rappel un reducer est une fonction pure ( pas liée à un contexte, dans d'autre terme une fonction `static`! ) avec une signature très simple :
		`(previousState, action) => newState`

```jsx
import {reducerBuilder} from 'focus-redux/reducers/reducer-builder';
import {loadUserTypes} from '../actions/user-actions';
import {saveUserTypes} from '../actions/user-actions';

// Données initiales pour la state redux
const DEFAULT_DATA = {
    firstName:'Amélie'
};

// Utilisation du reducerBuilder qui attends un name correspondant à votre entité, puis les types de load renvoyés par les actions
// mais aussi les types des saves et enfin les defaultData.
const userReducer = reducerBuilder({
    name: 'user',
    loadTypes: loadUserTypes,
    saveTypes: saveUserTypes,
    defaultData: DEFAULT_DATA
});

export default userReducer;
```

Encore une fois quelques explications très simples. Souvenez-vous, dans Redux, les reducers permettent de mettre à jour une partie du state pour une action particulière, discriminée par son type.  Le `reducerBuilder` permet alors de réaliser cela facilement pour nos deux actions construites avec l'`actionBuilder`. Il prend en entrée un objet composé de :

- name : correspondant à votre entité définition.

- LoadTypes : L'`actionBuilder` permet de construire trois actions au sens Redux du terme : la request, la response, et l'error. Ces trois types sont renvoyés par l'actionBuilder dans l'objet loadUserTypes que nous avons importé.

- SaveTypes : Même principe que le load.

- DefaultData : Il est également possible de mettre un state par default dans les reducers Redux. Cette fonctionnalité est également disponible via le `reducerBuilder` en lui donnant l'objet souhaité.

Ce builder permet donc de construire des reducers Redux, voila ce qu'il créé :
```jsx
 function userReducer(state = DEFAULT_STATE, {type, payload}){
 const {data} = state;
  switch (type) {
   case REQUEST_LOAD_USER:
       return {data, loading: true, saving: false};
   case RESPONSE_LOAD_USER:
       return {data: payload, loading: false, saving: false};
   case ERROR_LOAD_USER:
	   return {data: payload, loading: false, saving: false};    
   default:
       return state
  }
 }
```

> De la même façon que l'actionBuilder, le reducerBuilder permet de simplifier les développements, cependant son utilisation n'est pas obligatoire.


##Bilan

Nous avons donc réalisé un exemple complet de formulaire. On va juste faire un petit récapitulatif :
### Lancement par le cycle de vie du composant ou via un bouton

`Vue (load)   => dispatch une action (request) => middleware réalisant une action asynchrone (appel au serveur)(request) => reducer => nouveau state => vue(s) mise(s) à jour ( état loading) ---(après un certain temps)----> Response du serveur => dispatch une action (response ) => middleware (construction ou maj du state du form) (response) => reducer => nouveau state => vue(s) mise(s) à jour avec les données`

> Ce qu'il se passe quand un iput change ou blur

```
field:dispatch(INPUT_CHANGE) => application:middleware(INPUT_CHANGE):(dispatch(FORM_STATE)) => reducers => newState => field receive new value
```

```
field:dispatch(INPUT_BLUR) => application:middleware(INPUT_CHANGE):(dispatch(FORM_STATE)) => reducers => newState => field receive new value
```

Ce formulaire permet ainsi d'avoir facilement :
- les actions de load et de save avec gestion de l'asynchronité des requêtes à l'Api avec une gestion des erreurs et l'affichage de celle-ci
- les fieldHelpers ( fieldFor, selectFor, displayFor et listFor )
- le formatage des données via la fonction écrite dans les domaines (voir le tutoriel sur domaines)
- Une validation au blur ( désactivable facilement)
- Une fonctionnement par défaut sur le `onChange` avec une gestion des erreurs et l'affichage de celle-ci
- Une validation globale du formulaire avec une gestion des erreurs et l'affichage de celle-ci.


![capture](https://cloud.githubusercontent.com/assets/10349407/16381193/944d89fe-3c7b-11e6-9c05-d1b6c1d49a02.PNG)


#Des exemples, encore des exemples.

Le plus dur a été fait, reste maintenant des petits exemples en plus, pour agrémenter tout cela :

 - Les listes
 - Les `actionBuilder` avec deux noeuds
 - Trois exemples de middleware
 - Les listes de références

##Les listes

Via le connecteur fieldHelpers il est possible d'utiliser un listFor et ainsi d'avoir une liste éditable. Toujours quatre étapes à réaliser : la vue, les actions, les services et les reducers. Il n'est pas utile, ne refaire les même étapes que pour le cas d'un User, ainsi nous allons nous concentrer sur les changements :

 - L'objet serveur
 - Les actions et les reducers
 - La vue et le LineComponent

```
import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadFinanceAction, saveFinanceAction} from '../../actions/finance-actions';

import Panel from 'focus-redux/components/panel';
import {compose} from 'redux';
import FinancialMoveLine from './financialMoveLine'

const User = ({fieldFor,listFor, ...otherProps}) => (
  <Panel title='User' {...otherProps}>
      {fieldFor('name', {entityPath: 'finance'})}
      {fieldFor('amount', {entityPath: 'finance'})}
      {listFor('moves', {entityPath : 'finance', redirectEntityPath: ['financialMove'], LineComponent: FinancialMoveLine})}
  </Panel>
)


class SmartUser extends Component {
    componentWillMount() {
        const {id, load} = this.props;
        load({id});
    }

    render() {
        const {fieldFor, listFor} = this.props;
        return (
          <User fieldFor={fieldFor} listFor={listFor} { ...this.props}/>
        );
    }
};

User.displayName = 'SmartUser ';

const formConfig = {
    formKey: 'userForm',
    entityPathArray: ['finance'],
    loadAction: loadFinanceAction,
    saveAction: saveFinanceAction,
    nonValidatedFields: ['user.firstName']
};

const ConnectedUserForm = compose(
    connectToMetadata(['financialMove', 'finance']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(SmartUser );

export default ConnectedUserForm;

```
### Structure de l'objet :
Pour cet exemple voici l'objet envoyé par le serveur.
```jsx
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
```
### Les actions et les reducers

Les actions et les reducers n'ont rien de particulier pour une liste. Je vous invite à vous reporter à l'exemple du User pour ça.

### La vue et le LineComponent

Dans notre exemple, le champs `moves` de finance est une liste. Ainsi il a été précisé lors de la déclaration de l'entity definition , l'entity de redirection de la liste. Chacune de ses lignes sera un objet de cette entity de redirection.
```jsx
export const finance = {
  name:  {
    domain: 'DO_TEXTE',
    isRequired: true
  },
  amount:  {
    domain: 'DO_AMOUNT',
    isRequired: true
  },
  currency:  {
    domain: 'DO_SYMBOL',
    isRequired: true
  },
  moves:{
    redirect: ['financialMove']
  }
}

```

Il suffit, alors, d'ajouter un listFor :
`{listFor('moves', { redirectEntityPath: ['financialMove'], LineComponent: FinancialMoveLine})}`

En lui indiquant le champs qui doit être une liste et en lui donnant l'entité de la redirection ainsi que le LineCompoment :

```jsx
import React, {PropTypes} from 'react';

function FinancialMoveLine({fieldForLine,  ...otherProps}) {
    return (
    <div>
        <div>  {fieldForLine('transactionType', {entityPath: 'financialMove'})} </div>
        <div>  {fieldForLine('amount', {entityPath: 'financialMove'})}  </div>
    </div>
  );
}


FinancialMoveLine.displayName = 'financialMoveLine';
FinancialMoveLine.propTypes = {
    onClick: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string)
};
FinancialMoveLine.defaultProps = {
    options: []
}
export default FinancialMoveLine;

```

##Les actions Builders avec deux noeuds

Il est possible, de manière très simple, d'ajouter deux nœuds à une actionBuilder afin de charger deux entités lors d'un seul service.

```jsx

import {actionBuilder} from 'focus-redux/actions/entity-actions-builder';
import {loadUserFinance, saveUserFinance} from '../services/user-finance-service';

const _loadUserFinanceAction = actionBuilder({names: ['user', 'finance' ], type: 'load', service: loadUserFinance});

export const loadUserFinanceAction = _loadUserFinanceAction.action;


const _saveUserFinanceAction = actionBuilder({names: ['user','finance'], type: 'save', service: saveUserFinance});

export const saveUserFinanceAction = _saveUserFinanceAction.action;
```

Comme nous pouvons le remarquer, nous avons mis deux nœuds dans le tableaux names : 'user' et 'finance'. Notre serveur nous renvoyant les informations d'un user et l'objet finance avec les deux noms des nœuds comme clé.  

```jsx
{  
   "user":{  
      "uuid":"58d94a87-b8e5-40af-b2d7-fb5ee8cb1270",
      "firstName":"Kian",
      "lastName":"Stroman"
   },
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

Un question se pose concernant le reducer : *Quand on regarder plus en détail ce que l'actionBuilder renvoie, on se rend compte qu'il y a en effet : une action et six types différents. Pourquoi ?*
L'actionBuilder permet d'avoir un load pour deux entités, c'est l'action que vous pourrez donner dans votre formulaire ! Pour les types, pas panique c'est normal, vous avez deux entités, et donc six actions au sens redux du terme, vous avez alors six types pour vous reducer. Ainsi si vous avez suivi le superbe tutoriel depuis le début vous avez déjà un reducer pour le noeud finance, et un autre pour le noeud user. Ainsi vous n'avez besoin que de l'action pour votre vue.
Sinon je propose ces petits reducers ( et n'oubliez pas d'exporter vos types en retour de l'action) :

```jsx
import {reducerBuilder} from 'focus-redux/reducers/reducer-builder';
import {loadUserFinanceTypes, saveUserFinanceTypes} from '../actions/finance-user-actions';


// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_LOAD_FINANCE, RESPONSE_LOAD_FINANCE, ERROR_LOAD_FINANCE} = loadUserFinanceTypes;

// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_SAVE_FINANCE, RESPONSE_SAVE_FINANCE, ERROR_SAVE_FINANCE} = saveUserFinanceTypes;


// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_LOAD_USER, RESPONSE_LOAD_USER, ERROR_LOAD_USER} = loadUserFinanceTypes;

// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_SAVE_USER, RESPONSE_SAVE_USER, ERROR_SAVE_USER} = saveUserFinanceTypes;


// Utilisation du reducerBuilder qui attends le type des trois actions créés par l'actionBuimlder
export const financeReducer = reducerBuilder({
  name: 'finance',
  loadTypes: {REQUEST_LOAD_FINANCE, RESPONSE_LOAD_FINANCE, ERROR_LOAD_FINANCE} ,
  saveTypes: {REQUEST_SAVE_FINANCE, RESPONSE_SAVE_FINANCE, ERROR_SAVE_FINANCE}
});

export const userReducer = reducerBuilder({
	name: 'user',
    saveTypes: {REQUEST_SAVE_USER, RESPONSE_SAVE_USER, ERROR_SAVE_USER},
    loadTypes : {REQUEST_LOAD_USER, RESPONSE_LOAD_USER, ERROR_LOAD_USER},
    defaultData: DEFAULT_DATA
});


```

Sans oublier de les ajouter dans le combineReducer :

```jsx
import {combineReducers} from 'redux';
//import user from './user-reducer;
//import finance from './finance-reducer';
import {userReducer, financeReducer} from './user-finance-reducer'

export default combineReducers({
    user : userReducer,
    finance : financeReducer
  });
```

Nous sommes fin prêts à mettre en place notre formulaire à deux noeuds :

```jsx
import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadUserFinanceAction, saveUserFinanceAction} from '../../actions/finance-user-actions';

import Panel from 'focus-redux/components/panel';
import compose from 'lodash/flowRight';
import FinancialMoveLine from './financialMoveLine'

const User = ({fieldFor,listFor, ...otherProps}) => (
  <Panel title='User' {...otherProps}>
      {fieldFor('uuid', {entityPath: 'user'})}
      {fieldFor('firstName', {entityPath: 'user'})}
      {fieldFor('lastName', {entityPath: 'user'})}
      {fieldFor('name', {entityPath: 'finance'})}
      {fieldFor('amount', {entityPath: 'finance'})}
  </Panel>
)


class SmartUserFinance extends Component {
    componentWillMount() {
        const {id, load} = this.props;
        // Et voila un load !
        load({id});
    }

    render() {
        const {fieldFor, list} = this.props;
        return (
          <User fieldFor={fieldFor} listFor={list} { ...this.props}/>
        );
    }
};

SmartUserFinance.displayName = 'SmartUser ';

const formConfig = {
    formKey: 'userForm',
    entityPathArray: ['user','finance'],
    loadAction: loadUserFinanceAction,
    saveAction: saveUserFinanceAction,
    nonValidatedFields: ['user.firstName']
};

const ConnectedUserForm = compose(
    connectToMetadata(['user', 'financialMove', 'finance']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(SmartUserFinance );

export default ConnectedUserForm;


```

## Les Middlewares
Je vous recommande la documentation de redux : http://redux.js.org/docs/advanced/Middleware.html
qui vous sera d'une grande aide si vous avez un doute sur les middlewares.
N'hésitez pas à relire également la documentation sur le createStoreWithFocus.

Vous voulez avoir, en fonction d'une action, un comportement particulier, une logique autre : le middleware est la pour vous. Nous allons pour cela mettre en place trois middlewares d'exemple :

 - Un middleware qui permet lors d'une action de réaliser la même action sur un autre champs
 - Un middleware qui permet lors d'une action de réaliser une autre action du form.
 - Un middleware qui permet lors d'une action de réaliser une autre action que nous avons écrit.

### Middleware de base :

 Prenons un exemple précis. Lorsqu'un input particulier vient à changer et que ce changement doit mettre en majuscule un autre input ( oui oui, ce cas arrive tous les jours ), c'est dans le middleware que tout va se jouer.
Pour cela deux étapes  :

- Ecrire le middleware :
Vous pouvez créer un dossier middleware et écrire dans notre cas :
```jsx
import builder from 'focus-redux/store/builder';
import rootReducer from '../reducer';
import {INPUT_CHANGE, INPUT_ERROR} from 'focus-redux/actions/input';


export const amoutToUpperCaseMiddleware = store => next => action => {
    //On récupère les informations que l'on souhaite dans le state Redux	
    const {forms, definitions, domains} = store.getState();
    //On recherche l'action souhaitée sur le champs souhaité afin de réaliser notre action
    if (action.type === INPUT_CHANGE && action.fieldName == 'amount') {
        // L'objet action est celui décrit dans les actions [focus-redux](https://github.com/get-focus/focus-redux/blob/master/src/actions/form.js) 
        const {formKey} = action;
        const {fields} = forms.find(f=> f.formKey === formKey);
        //On met en forme notre nouvelle action
        const lastNameAction = {...action};
        lastNameAction.fieldName = 'name';
        lastNameAction.rawValue =  fields.find(f => f.name == 'name').rawInputValue.toUpperCase();
        //On réalise la première action
        next(action);
        //On dispatch l'action que nous avons créée
        store.dispatch(lastNameAction);
    } else {
    	//Dans tous les autres cas d'action, on realise l'action sans modification
        next(action);
    }
}

export default amoutToUpperCaseMiddleware;
```
IL est très simple, via les middlewares, de se placer avant ou après une action, afin de réaliser des modifications. Il suffit pour cela de récupérer l'action qui nous intéresse, de créer la nouvelle action, de réaliser la première et enfin de dispatcher l'action créée (qui passera aussi dans les middlewares). 

- L'ajouter lors de la création du store :

Je vous invite pour cette partie de relire la partie sur le store Redux et sur le [createStoreWithFocus](https://github.com/get-focus/focus-tuto-redux/blob/master/README.md#dernier-point-avant-de-se-lancer-on-va-créer-un-store-un-peu-plus-avancé)

```jsx
import createStoreWithFocus from 'focus-redux/store/create-store';
import rootReducer from '../../src/reducer';
import {amoutToUpperCaseMiddleware} from '../../src/middleware/user-middleware';

//
const store = createStoreWithFocus({dataset: rootReducer}, [amoutToUpperCaseMiddleware]);

export default store;
```
> Le tour est joué ! C'est magique non ?

### Middleware, deuxième exemple

Il est également possible de dispatcher un autre action. Il suffit pour cela de réaliser la même chose que précédemment en ajoutant seulement un autre type et en respectant le contract défini par les [actions](https://github.com/get-focus/focus-redux/blob/master/src/actions/form.js) du form. Il est possible de mettre en place toutes actions disponibles du form.

```jsx
export const errorFieldMiddleware = store => next => action => {
    const {forms, definitions, domains} = store.getState();
    if (action.type === INPUT_CHANGE && action.fieldName == 'amount') {
        const errorAction = {};
        errorAction.type = 'INPUT_ERROR';
        errorAction.formKey = action.formKey;
        errorAction.fieldName = 'name';
        errorAction.entityPath = action.entityPath;
        errorAction.error = "Une erreur venue de l'espace !! "
        next(action);
        store.dispatch(errorAction);
    } else {
        next(action);
    }
}
```

sans oublier de l'injecter lors de la construction du store :

```jsx
import builder from 'focus-redux/store/builder';
import rootReducer from '../../src/reducer';
import {amoutToUpperCaseMiddleware, errorFieldMiddleware} from '../../src/middleware/user-middleware';

const store = builder(rootReducer, [amoutToUpperCaseMiddleware, errorFieldMiddleware]);

export default store;
```


###Un troisième pour la route !

> En pratique ce troisième cas ne sera pas le plus utilisé, mais c'est toujours bien de savoir que c'est possible. Qui plus est, ça montre d'autant plus la force de redux ( au cas où vous ne seriez pas encore convaincu ).

Avec Focus-redux, un nombre d'actions de base est déjà présent, comme `input_change`, ou le `create_form`. Cependant pour des besoins spécifiques (très spécifiques) il se peut que vous ayez besoin d'avoir une action qui ajoute, modifie une partie du state et qui ne sera pas disponible via le form. Il faut alors écrire cette action.  Pour ça, il y a un peu plus d'étapes.

> Attention via cette technique il n'est pas possible de modifier l'objet form (et donc fields) du state, qui ne peut se modifier qu'à travers les actions du form. 

- Le middleware :

```jsx
export const ownActiondMiddleware = store => next => action => {
    const {forms, definitions, domains} = store.getState();
    if (action.type === INPUT_CHANGE && action.fieldName == 'name') {
        const customAction = {};
        customAction.type = 'MY_ACTION';
        customAction.formKey = action.formKey;
        next(action);
        store.dispatch(customAction);
    } else {
        next(action);
    }
}
```
 Toujours le même principe,  au moment de l'action `input_change` sur le `name` on va dispatcher une autre action mais cette fois ce sera une action custom.

- L'action custom:

Une action au sens redux du terme ça ressemble à ça. En effet pour les actions spécifiques du load et du save l'actionBuilder est là pour vous simplifier les développements cependant, pour des actions "simples", voici ce que vous devez ecrire. Une action doit toujours avec un type, ce type étant le descriminant pour les reducers. Puis elle contient les informations nécessaire au reducer pour transformer le state. Pour cet exemple la clé du formulaire et suffisant, maintenant vous pouvez tout aussi bien lui donner autre chose.

```jsx
export const MY_ACTION = 'MY_ACTION';

export const customAction = (formKey) => {
  type: MY_ACTION,
  formKey
}
```
- Le reducer :

De la même façon qu'avec l'action, le reducerBuilder n'est pas utile ici. Cependant il est important de comprendre qu'un reducer agit sur une partie du state et donc vous devrez indiquer ici tout les reducers dont vous avez besoin pour agir sur cette partie du state en particulier, il faudra alors réaliser un switch en fonction des différentes actions disponibles pour cette partie du state. Nous en avons qu'une seule ici, mais il n'est pas exclu d'en avoir plusieurs.

Lorsque l'action MY_ACTION est dipatchée par notre middleware, le reducer va ajouter un message de victoire dans le state, sinon il ajoutera un autre message d'echec...  Il faut maintenant ajouter notre reducer dans le combineReducer. C'est à ce moment la qu'on définira le noeud du store, et donc le nom dans le state. Vous allez voir c'est très simple.

```jsx
import {MY_ACTION} from '../actions/custom-actions';

 const customReducer = (state = {}, action) => {
    switch(action.type) {
        case MY_ACTION:
          return {victoire: 'De la Gloire'};
        default:
          return {echec: 'De l'echec' };
    }
};

export default customReducer;

```

> A noter : il est important de se rappeler que le state redux est un objet immutable et ainsi vous devez toujours renvoyer un nouvel objet et non modifier le premier.

- Le combineReducer :

Il vous suffit d'ajouter votre reducer lors de la déclaration de votre store dans le customData :
```jsx
import customReducer from './custom-reducer'
const store = builder({dataset: rootReducer, customData: customReducer}, [lastNameMiddleware, ownActiondMiddleware], [DevTools.instrument()]);

```

Et voila, le tour est joué. Notre information se trouvera donc dans customData.

- Le connecteur :

Un dernier petit effort, c'est presque fini ! Donc maintenant que notre information est dans notre store, il faut récupérer cette information, souvenez-vous de nos amis les connecteurs. Notre vue doit se connecter à cette information du state, on se place alors dans celle-ci en se concentrant sur les connecteurs :

```jsx
import {connect as connectToState} from 'react-redux';
import {selectData} from 'focus-redux/store/create-store';

[...]

const ConnectedUserForm = compose(
    connectToState(selectData('customData'))
    connectToMetadata(['user', 'financialMove', 'finance']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(SmartUserFinance );
```
 Il vous suffit alors de renseigner le noeud du state que vous voulez récupérer : `customData` via la fontion selectData (qui permet de récupérer la bonne partie du state) et de vous connecter via la fonction connect de Redux.  
 Et voila, je vous jure que c'est fini, votre information se trouve maintenant dans vos props !

```jsx
const User = ({fieldFor,listFor, victoire, echec, ...otherProps}) => (
  <Panel title={victoire ? "User " +victoire : "User " + echec} {...otherProps}>
      {fieldFor('name', {entityPath: 'finance'})}
      {fieldFor('amount', {entityPath: 'finance'})}
      {listFor('moves', { redirectEntityPath: ['financialMove'], LineComponent: FinancialMoveLine})}
  </Panel>
)
```

> Pour rappel et pour conclure cette partie sur les middlewares, le principal c'est de comprendre qu'un middleware a accès au state dans sa globalité et qu'il fonctionnne dans un context donné, à l'inverse d'un reducer qui est pur et ne travaille que sur une partie de state pour en donner une autre. Les deux sont à utiliser pour des cas différents, et il n'est pas superflux de se poser les bonnes questions avant de choisir l'un ou l'autre.


##Les listes de reférences

Pour une utilisation complète de Focus, il serait bien de ne pas oublier les listes de références. Alors voici un dernier exemple.  Il reprend tous les concepts déjà utilisés, du coup, je vais me permettre d'aller un peu plus vite !

On va faire ça en quelques étapes :

- Le service de chargement des listes :

Toujours la même chose, c'est un service. Il a été simulé chez nous mais cela correspond à un appel serveur :

```jsx
export const loadCivility = () => Promise.resolve([{code: 'MR', label: 'M.'}, {code: 'MRS', label: 'Mme'}]);
```
- Le fichier de masterDataConfig :
Dans le dossier `config` nous avons donc ajouté un fichier : `master-data-config`. Celui-ci construit l'objet `masterDataConfig` nécessaire au provider `MasterData` qui permet le chargement des domaines et définitions.

- Le provider masterData :

Dans le fichier `root`
```jsx
import {masterDataConfig} from './config/master-data-config'
// VOTRE CODE
<MasterDataProvider configuration={masterDataConfig}>
```

- La vue :
 Et enfin on vous a fait un dernier petit exemple pour mettre en musique tout cela, on a aussi ajouté un checkBox (de Focus-components, bien sûr) dans l'inputComponent d'un de nos domaines, mais aussi le fait de faire apparaître des champs en fonction d'un select. Vous allez voir c'est fou.
 Sinon, pour les listes de références il faut ajouter le connecteur des MasterData : `connectToMetadata(['user'])`, mais aussi le load dans le `componentWillMount` : `loadMasterData();` et dans le selectFor : `{selectFor('civility', {entityPath: 'user', masterDatum: 'civility'})}` il faut préciser le propriété masterDatum et le tour est joué !

```jsx
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {connect as connectToMasterData} from 'focus-redux/behaviours/master-data';
import {loadUserAction, saveUserAction} from '../../actions/user-actions';

import Panel from 'focus-redux/components/panel';
import {compose} from 'redux';

class UserForm extends Component {
    componentWillMount() {
        const {id, load, loadMasterData} = this.props;
        load({id});
        loadMasterData();
    }

    render() {
        const { fields, fieldFor, selectFor} = this.props;
        console.log(this.props)
        const civilityField = find(fields, {name: 'civility', entityPath: 'user'});
        return (
            <Panel title='User with more details for Mrs' {...this.props}>
                {fieldFor('uuid', {entityPath: 'user'})}
                {fieldFor('style',  {entityPath: 'user'})}
                {selectFor('civility', {entityPath: 'user', masterDatum: 'civility'})}
                {civilityField && civilityField.rawInputValue === 'MRS' && fieldFor('firstName', {entityPath: 'user'})}
                {civilityField && civilityField.rawInputValue === 'MRS' && fieldFor('lastName', {entityPath: 'user'})}
            </Panel>
        );
    }
};

UserForm.displayName = 'UserForm';

const formConfig = {
    formKey: 'userCustomForm',
    entityPathArray: ['user', 'address'],
    loadAction: loadUserAction,
    saveAction: saveUserAction,
    nonValidatedFields: ['user.firstName']
};

const ConnectedUserForm = compose(
    connectToMetadata(['user']),
    connectToMasterData(['civility']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(UserForm);

export default ConnectedUserForm;
```
