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

> Note que cette partie n'est certainement pas présente dans le starter kit dans la mesure où tout est prêt pour un démarrage rapide.

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
- Par exemple si nos nous plaçons dans le composant application qui ets déjà connecté au store.

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

## Faire une page avec la nouvelle ma manière de gérer le form.

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

> Le socle applicatif est maintenant prêt.
> On y va, on peut passer aux exemples ! 

# Afficher les informations d'un User ! 

Pour ce tuto on va se placer dans le cas de User. Ce composant est l'exemple parfait d'un formulaire. Nous voulons afficher : 
- Son firstName
- Son lastName
- Son uuid 
 
> Pour cela rien de plus simple ! 

# La vue 
 
Nous avons besoin d'un composant User 

```jsx 
import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadUserAction, saveUserAction} from '../../actions/user-actions';

// Les boutons de de save et de load sont maintenant portés par le panel, attention de ne pas utiliser celui de Focus-components
import Panel from 'focus-redux/components/panel';
import compose from 'lodash/flowRight';

class User extends Component {
    componentWillMount() {
        const {id, load} = this.props;
        // Et voila un load !
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
// Load Action, elle porte bien son nom ! Elle se trouve maintenant dans les props sous le nom de .... load
// Save Action, elle porte également très bien sont nom et se trouve également dans les props sont le nom de ... save !!
// nonValidatedFields : vous avez une défition qui donne un champ required et pour ce form en particulier vous voulez l'enlevez
// c'est l'endroit, il suffit de mettre: entityPath."nom de la proprieté", pour les listes voici un exemple : {'user.childs': ['firstName']}
// 'entityPath.'nom de la propriété de la liste dans l'objet' : tableau des proprietés de l'objet de la liste
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

//Attention de toujours exporter le composant conecté ... ( oui il m'est arrivé de faire l'erreur, et alors ?! ) 
export default ConnectedUserForm;


```

Expliquons le pas à pas ! 

### Création d'un composant :
 Rien de bien nouveau au soleil, je vous invite à aller sur le site de React en cas de doute subsistant. Notre composant est un composant React des plus classiques. 
 > Dans l'immédiat, et pour une meilleure clarté de ce tutoriel, le composant User est une classe qui possède la logique ( load ... ) et l'affichage. En pratique, nous vous encourageons de séparer cette logique de l'affichage et afin d'utiliser des composants pures, pour plus de performance, de beauté ! 
 
```jsx
import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadUserAction, saveUserAction} from '../../actions/user-actions';

import Panel from 'focus-redux/components/panel';
import compose from 'lodash/flowRight';


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
Avant tout de chose, pour petit rappel, cette connexion est possible grâce au provider qui ont été mis  précédemment autour de vos composants, ainsi que la création du Store ( n"hésitez pas à relire ce qui est indiqué plus haut si cela n'est pas clair ). Dans notre cas nous allons connecter notre composant : 
		-  au metaDonnées ( les définitions et les domaines ), 
		-  au fonctionnalités disponibles du Form via un objet de config ( que nous allons détaillé juste en dessous). 
		- au fieldHelpers qui va exposé les fonctionnnalité de fieldFor ( par exemple .... ) 

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
**Le tableau de nonValidatedFields :** Ce tableau permet dans le cas où l'entity definition de votre entity utilisé dans le formulaire a des champs que vous ne souhaitez pas valider.  Nous préconisons une utilisons occasionnel de ce tableau. En effet si cela devient systématique, nous recommandons de faire des objets non-persisté en base spécifique pour le formulaire en question.  
Pour la forme, il suffit de lui passer le champs en question de l'entity via une notation simple : 'entity.nomDuChamps'. Pour les champs listes, même principe mais avec un tableau : `nonValidatedFields: ['user.uuid', {'user.childs': ['firstName']}]`

> Votre composant est maintenant connecté aux différents provider dont vous avez besoin, n'oubliez pas que c'est le composants connecté qu'il faut exporté ! 

### Votre composant est prêt ! 

Et voila rien de plus simple maintenant, tout est dans vos props ! Le fieldFor, selectFor et ListFor, le save, le load et compagnie ! 
Vous pouvez maintenant construire votre vue avec des fieldFor comme ça par exemple : 
`{fieldFor('uuid', {entityPath: 'user'})}`

Comme il est possible d'associer plusieurs entityPath à un form, il devient nécessaire d'indiquer pour chaque fieldFor l'entityPath a laquel il appartient ! Il est possible également de surcharger toutes les fonctions `onChange` ou `onBlur` : 
`{fieldFor('uuid', {onChange: () => {console.log('onChange changé !')}, entityPath: 'user'})}`

Dans le cas ou votre formulaire n'est associé qu'à une seule entité, il n'est pas nécessaire d'indiquer l'entityPath à chaque fois. 

> Pour mettre ce composant en musique, comme vous l'avez sans doute remarqué, nous avons du importer des actions ! Pas de panique, c'est la prochaine partie ! 

# Les actions  :
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

- Les `names `:  c'est un tableau qui correspond aux nodes du store redux concerné par votre action ( dans notre cas nous avons mis `user`), il est tout a fait possible d'en mettre plusieurs pour mettre à jour plusieurs noeuds.

- Le type : Toute action doit avoir un type, load ou save.
- Le service : Fonction qui fait appel aux serveurs.

> Vous avez ainsi en retour, une action que vous allez utiliser dans votre vue, ainsi que des types qui seront utilisés dans vos reducers ( expliqué juste en dessous ! ) 

#Les services 

Les services fonctionnent exactement de la même façon qu'avant, ne perdons pas de temps inutilement. 

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

Encore une fois quelques explications très simples. Souvenez-vous, dans Redux, les reducers permettent de mettre à jour une partie du state pour une action particulière, discriminée par son type.  Le `reducerBuilder` permet alors de realiser cela facilement pour nos deux actions construites avec l'`actionBuilder`. Il prend en entrée un objet composé : 

- name : correspondant à votre entité définition.

- LoadTypes : L'`actionBuilder` permet de construire trois actions au sens Redux du terme : la request, la response, et l'error ces trois types sont dans l'objet renvoyé par l'actionBuilder dans l'objet loadUserTypes que nous avons importé. 

- SaveTypes : Même principe que le load. 

- DefaultData : Il est également possible de mettre un state par default dans les reducers Redux. Cette fonctionnalité est également disponible via le `reducerBuilder` en lui donnant un objet ici. 

Ce builder permet donc de construire des reducers Redux, voila ce qu'il créé : 
```jsx
 function userReducer(state = DEFAULT_STATE, {type, payload}){
 const {data} = state;
  switch (type) {
   case REQUEST_LOAD_USER:
       return {data, loading: true, saving: false};
   case RESPONSE_LOAD_USER:
       return {data: payload, loading: false, saving: false};
   default:
       return state
  }
 }
```

> Juste pour information, que ce soit clair l'actionBuilder ou le reducerBuilder, ils ont été mis en place pour vous simplifier la vie, si cela vous la complique dans certain cas n'hésitez pas à écrire vos actions "à la main" ou je vous invite à lire la partie sur le middleware. 

> En voila vous êtes fin prêt pour utiliser ce formulaire !



#Des exemples, encore des exemples.

Le plus dur a été fait, reste maintenant des petits exemples en plus, pour agrémenter tout cela. 


##Les listes 

```
import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadFinanceAction, saveFinanceAction} from '../../actions/finance-actions';

import Panel from 'focus-redux/components/panel';
import compose from 'lodash/flowRight';
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

En reprenant le même principe qu'en haut mais avec l'objet finance : 
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
( les actions, les reducers ont été fait de la même façon que User mais avec Finance ) 

Il suffit d'ajouter un listFor : 
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

```jsx

import {actionBuilder} from 'focus-redux/actions/entity-actions-builder';
import {loadUserFinance, saveUserFinance} from '../services/user-finance-service';

const _loadUserFinanceAction = actionBuilder({names: ['user', 'finance' ], type: 'load', service: loadUserFinance});

export const loadUserFinanceAction = _loadUserFinanceAction.action;


const _saveUserFinanceAction = actionBuilder({names: ['user','finance'], type: 'save', service: saveUserFinance});

export const saveUserFinanceAction = _saveUserFinanceAction.action;
```

Comme nous pouvons le remarquer, nous avons mis deux noeuds dans le tableaux names : 'user' et 'finance'. Notre serveur nous renvoyant les informations d'un user et l'objet finance de celui-ci : 

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

Pour le reducer plusieurs question à se poser. 
Quand on regarder plus en détail ce que l'actionBuilder renvoie, on se rend compte qu'il y a en effet : une action et six types différents. Pourquoi ? 
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
export const financeUserReducer = reducerBuilder({
  name: 'finance',
  loadTypes: {REQUEST_LOAD_FINANCE, RESPONSE_LOAD_FINANCE, ERROR_LOAD_FINANCE} ,
  saveTypes: {REQUEST_SAVE_FINANCE, RESPONSE_SAVE_FINANCE, ERROR_SAVE_FINANCE}
});

export const userfinanceReducer = reducerBuilder({
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

Nous sommes fin prêt pour mettre en place notre formulaire à deux noeuds : 

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

## Middleware à la main ! 
Je vous recommande la documentation de redux : http://redux.js.org/docs/advanced/Middleware.html
qui vous sera d'une grande aide si vous avez un doute sur les middleware. 
N'hésitez pas à relire également la documentation sur le createStore plus haut ! 

Sinon dans notre cas précis, vous voulez avoir en fonction d'une action, un comportement particulier, une logique autre, le middleware est la pour vous. 
Prenons un exemple précis, lorsqu'un input particulier vient à changer et que ce changement doit mettre en majuscule un autre input ( oui oui, ce cas arrive tous les jours ), c'est dans le middleware que tout va se jouer. 
RESUME ET CONTEXTE DES TROIS MIDDLEWARE

### Middleware de base : 
 
Pour cela deux étapes  : 

- Ecrire le middleware : 
Vous pouvez créer un dossier middleware et écrire dans notre cas : 
```jsx
import builder from 'focus-redux/store/builder';
import rootReducer from '../reducer';
import {INPUT_CHANGE, INPUT_ERROR} from 'focus-redux/actions/input';


export const amoutToUpperCaseMiddleware = store => next => action => {
	// EXPLIQUER
    const {forms, definitions, domains} = store.getState();
    if (action.type === INPUT_CHANGE && action.fieldName == 'amount') {
        const {formKey} = action;
        const {fields} = forms.find(f=> f.formKey === formKey);
        const lastNameAction = {...action};
        lastNameAction.fieldName = 'name';
        lastNameAction.rawValue =  fields.find(f => f.name == 'name').rawInputValue.toUpperCase();
        next(action);
        store.dispatch(lastNameAction);
    } else {
        next(action);
    }
}

export default amoutToUpperCaseMiddleware;
```

- L'ajouter lors de la création du store : 

```jsx
import builder from 'focus-redux/store/builder';
import rootReducer from '../../src/reducer';
import {amoutToUpperCaseMiddleware} from '../../src/middleware/user-middleware';

const store = builder(rootReducer, [amoutToUpperCaseMiddleware]);

export default store;
```
> Le tour est joué ! C'est magique non ? 

### Middleware, deuxième exemple 

Il est également possible de dispatcher un autre action. 

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

Avec Focus-redux, un nombre d'actions de base est déjà présent, comme `input_change`, ou le `create_form`. Cependant pour des besoins spécifiques (très spécifiques) il se peut que vous ayez besoin d'avoir une action qui ajoute, modifie une partie du state. Pour ça, il y a un peu plus d'étapes : 

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

Une action au sens redux du terme ça ressemble à ça. En effet pour les actions spécifiques du load et du save l'actionBuilder est la pour vous simplifier les dévellopements cependant, pour des actions "simples", voici ce que vous devez ecrire. Une action doit toujours avec un type, ce type étant le descriminant pour les reducers. puis elle contient les informations nécessaire au reducer pour transformer le state. Pour cet exemple la clé du formulaire et suffisant, maintenant vous pouvez tout aussi bien lui donner autre chose. 
 
```jsx
export const MY_ACTION = 'MY_ACTION';

export const customAction = (formKey) => {
  type: MY_ACTION,
  formKey
}
```
- Le reducer : 
De la même façon qu'avec l'action, le reducerBuilder n'est pas utile ici. Cependant il est important de comprendre qu'un reducer agit sur une partie du state et donc vous devrez indiquer ici tout les reducers dont vous avez besoin pour agir sur cette partie du state en particulier, il faudra alors réaliser un switch en fonction des différentes action disponibles pour cette partie du state. Nous en avons qu'une seule ici, mais il n'est pas exclu d'en avoir plusieurs. 

Lorsque l'action MY_ACTION est dipatché par notre middleware, le reducer va ajouter un message de victoire dans le state, sinon il ajoutera un autre message d'echec...  Il faut maintenant ajouter notre reducer dans le combineReducer, c'est à ce moment la qu'on définira le noeud du store, et donc le nom dans le state. Vous allez voir c'est très simple. 

```jsx
import {MY_ACTION} from '../actions/custom-actions';

 const customReducer = (state = {}, action) => {
    switch(action.type) {
        case MY_ACTION:
          return state = {victoire: 'De la Gloire'}
        default:
          return state = {echec: 'De l'echec' };
    }
};

export default customReducer;

```

- Le combineReducer : 

```jsx
import {combineReducers} from 'redux';
import user from './user-reducer';
import finance from './finance-reducer';
import customReducer from './custom-reducer'
//import {userfinanceReducer, financeUserReducer} from './user-finance-reducer'

export default combineReducers({
    user,
    finance,
    customData : customReducer
  });

```

Et voila, le tour est joué. Notre information se trouvera donc dans customData. 

- Le connecteur :

Un dernier petit effort, c'est presque fini ! Donc maintenant que notre information est dans notre store, il faut récupérer cette information, souvenez-vous de nos amis les connecteurs. Notre vue doit se connecter à cette information du state, on se place alors dans celle-ci en ce concentrant sur les connecteurs : 

```jsx 
import {connect as connectToState} from 'react-redux';
import selectData from 'focus-redux/store/select-data';

[...]

const ConnectedUserForm = compose(
    connectToState(selectData('customData'))
    connectToMetadata(['user', 'financialMove', 'finance']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(SmartUserFinance );
```
 Il vous suffit alors de renseigner le noed du state que vous voulez récupérer : `customDate` via la fontion selectData (qui permet de récupérer la bonne partie du state) et de vous connecter via la fonction connect de Redux.  
 Et voila, je vous jure c'est fini , votre information se trouve maintenant dans vos props ! 

```jsx
const User = ({fieldFor,listFor, victoire, echec, ...otherProps}) => (
  <Panel title={victoire ? "User " +victoire : "User " + echec} {...otherProps}>
      {fieldFor('name', {entityPath: 'finance'})}
      {fieldFor('amount', {entityPath: 'finance'})}
      {listFor('moves', { redirectEntityPath: ['financialMove'], LineComponent: FinancialMoveLine})}
  </Panel>
)
```

> Pour rappel et pour conclure cette partie sur les middlewares, le principal c'est de comprendre qu'un middleware a accès au state dans ce globalité et qu'il fonctionnne dans un context donné, à l'inverse d'un reducer qui est pur et ne travaille que sur une partie de state pour en donner une autre. Les deux sont à utiliser pour des cas différents, et il n'est pas superflux de se poser les bonnes questions avant de choisir l'un ou l'autre. Pour cela rien de plus simple, la documentation de Redux ! 


##Les listes de reférences 

Pour une utilisation complète de Focus, il serait bien de ne pas oublier les listes de références. Alors voici un dernier exemple.  Il reprend tout les concepts déjà utilisé, du coup je vais me permettre d'aller un peu plus vite ! 

On va faire ça en quelques étapes : 

- Le service de chargement des listes : 

Toujours la même chose c'est un service. Il a été simulé chez nous : 

```jsx 
export const loadCivility = () => Promise.resolve([{code: 'MR', label: 'M.'}, {code: 'MRS', label: 'Mme'}]);
```
- Le fichier de masterDataConfig : 
Dans le dossier `config` nous avons donc ajouté un fichier : `master-data-config`, qui contruit l'objet `masterDataConfig` nécessaire au provider MasterData.

- Le provider masterData :

Dans le fichier `root`
```jsx
import {masterDataConfig} from './config/master-data-config'
// VOTRE CODE
<MasterDataProvider configuration={masterDataConfig}>
```

- la vue : 
 Et enfin on vous ai fait un dernier petit exemple pour mettre en musique tout cela, on a ajouté aussi un checkBox ( de Focus-components, bien sûr ) dans l'inputComponent d'un de nos domaines, mais aussi le fait de faire apparaître des champs en fonction d'un select. Vous allez voir c'est fou. 
 Sinon, pour les listes de références il faut ajouter le connecteur des MasterData : `connectToMetadata(['user'])`, mais aussi le load dans le `componentWillMount` : `loadMasterData();` et dans le selectFor : `{selectFor('civility', {entityPath: 'user', masterDatum: 'civility'})}` il faut préciser le propriété masterDatum et le tour est joué ! 

```jsx
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {connect as connectToMasterData} from 'focus-redux/behaviours/master-data';
import {loadUserAction, saveUserAction} from '../../actions/user-actions';

import Panel from 'focus-redux/components/panel';
import compose from 'lodash/flowRight';

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

