# Votre premier formulaire

Commençons par quelque chose de simple, on va afficher simplement les informations d'un User, avec son prénom, son nom, et l'id.

Il y a alors quatre étapes pour réaliser cela. La vue, les actions, les services et les reducers.

# La vue

Nous avons besoin d'un composant React : User.

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
 Rien de bien nouveau au soleil, je vous invite à aller sur le site de React en cas de doute subsistant. Notre composant est un composant React des plus classiques.

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
Avant tout de chose, pour petit rappel, cette connexion est possible grâce au provider qui ont été mis  précédemment autour de vos composants, ainsi que la création du store ( via le createStoreWithFocus ). Dans notre cas nous allons connecter notre composant :

- au metaDonnées ( les définitions et les domaines )

- au fonctionnalités disponibles du Form via un objet de config

- au fieldHelpers qui va exposer les fonctionnnalités de fieldFor ( par exemple .... )

- au fieldHelpers qui va exposé les fonctionnnalité de fieldFor ( par exemple .... )

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
**Le tableau de nonValidatedFields :** Ce tableau permet dans le cas où l'entity definition de votre entity utilisé dans le formulaire a des champs que vous ne souhaitez pas valider.  Nous préconisons une utilisation occasionnelle de ce tableau. En effet si cela devient systématique, nous recommandons de faire des objets non-persistés en base spécifique pour le formulaire en question.  
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

- LoadTypes : L'`actionBuilder` permet de construire trois actions au sens Redux du terme : la request, la response, et l'error ces trois types sont renvoyé par l'actionBuilder dans l'objet loadUserTypes que nous avons importé.

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

Nous avons donc réaliser un exemple complet de formulaire. On va juste faire un petit récapitulatif :
### Lancement par le cycle de vie du composant ou via un bouton

`Vue (load)   => dispatch une action (request) => middleware réalisant une action asynchrone (appel au serveur)(request) => reducer => nouveau state => vue(s) mise(s) à jour ( état loading) ---(après un certain temps)----> Response du serveur => dispatch une action (response ) => middleware (construction ou maj du state du form) (response) => reducer => nouveau state => vue(s) mise(s) à jour avec les données`

Ce formulaire permet ainsi d'avoir facilement :
- les actions de load et de save avec gestion de l'asynchronité des requêtes à l'Api avec une gestion des erreurs et l'affichage de celle-ci
- les fieldHelpers ( fieldFor, selectFor, displayFor et listFor )
- le formatage des données via la fonction écrite dans les domaines (voir le tutoriel sur domaines)
- Une validation au blur ( désactivable facilement)
- Une fonctionnement par défaut sur le `onChange` avec une gestion des erreurs et l'affichage de celle-ci
- Une validation globale du formulaire avec une gestion des erreurs et l'affichage de celle-ci.

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

Dans notre exemple, le champs `moves` de finance est une liste. Ainsi il a été précisé lors de la déclaration de l'entity definition , l'entity de redirection de la liste. Ainsi chacune de ses lignes sera un objet de cette entity de redirection.
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

Il est possible très facilement d'ajouter deux nœuds à une actionBuilder afin de charger deux entités lors d'une seul service.

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

## Les Middlewares
Je vous recommande la documentation de redux : http://redux.js.org/docs/advanced/Middleware.html
qui vous sera d'une grande aide si vous avez un doute sur les middleware.
N'hésitez pas à relire également la documentation sur le createStoreWithFocus.

Vous voulez avoir en fonction d'une action, un comportement particulier, une logique autre, le middleware est la pour vous. Nous allons pour cela mettre en place trois middleware d'exemple :

 - Un middleware qui permet lors d'une action de réaliser la même action sur un autre champs
 - Un middleware qui permet lors d'une action de réaliser une autre action du form.
 - Un middleware qui permet lors d'une action de réaliser une autre action que nous avons écrit.

### Middleware de base :

 Prenons un exemple précis, lorsqu'un input particulier vient à changer et que ce changement doit mettre en majuscule un autre input ( oui oui, ce cas arrive tous les jours ), c'est dans le middleware que tout va se jouer.
Pour cela deux étapes  :

- Ecrire le middleware :
Vous pouvez créer un dossier middleware et écrire dans notre cas :
```jsx
import builder from 'focus-redux/store/builder';
import rootReducer from '../reducer';
import {INPUT_CHANGE, INPUT_ERROR} from 'focus-redux/actions/input';


export const amoutToUpperCaseMiddleware = store => next => action => {
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
import builder from 'focus-redux/store/create-store';
import rootReducer from '../../src/reducer';
import {amoutToUpperCaseMiddleware} from '../../src/middleware/user-middleware';

const store = builder({dataset: rootReducer}, [amoutToUpperCaseMiddleware]);

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

Avec Focus-redux, un nombre d'actions de base est déjà présent, comme `input_change`, ou le `create_form`. Cependant pour des besoins spécifiques (très spécifiques) il se peut que vous ayez besoin d'avoir une action qui ajoute, modifie une partie du state. Il faut alors écrire cette action.  Pour ça, il y a un peu plus d'étapes :

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

Une action au sens redux du terme ça ressemble à ça. En effet pour les actions spécifiques du load et du save l'actionBuilder est la pour vous simplifier les dévellopements cependant, pour des actions "simples", voici ce que vous devez ecrire. Une action doit toujours avec un type, ce type étant le descriminant pour les reducers. Puis elle contient les informations nécessaire au reducer pour transformer le state. Pour cet exemple la clé du formulaire et suffisant, maintenant vous pouvez tout aussi bien lui donner autre chose.

```jsx
export const MY_ACTION = 'MY_ACTION';

export const customAction = (formKey) => {
  type: MY_ACTION,
  formKey
}
```
- Le reducer :

De la même façon qu'avec l'action, le reducerBuilder n'est pas utile ici. Cependant il est important de comprendre qu'un reducer agit sur une partie du state et donc vous devrez indiquer ici tout les reducers dont vous avez besoin pour agir sur cette partie du state en particulier, il faudra alors réaliser un switch en fonction des différentes action disponibles pour cette partie du state. Nous en avons qu'une seule ici, mais il n'est pas exclu d'en avoir plusieurs.

Lorsque l'action MY_ACTION est dipatchée par notre middleware, le reducer va ajouter un message de victoire dans le state, sinon il ajoutera un autre message d'echec...  Il faut maintenant ajouter notre reducer dans le combineReducer, c'est à ce moment la qu'on définira le noeud du store, et donc le nom dans le state. Vous allez voir c'est très simple.

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

> A noter, il est important de se rappeler que le state redux est un objet immutable et ainsi vous devez toujours renvoyer un nouvel objet et non modifier le premier.

- Le combineReducer :

Il vous suffit d'ajouter votre reducer lors de la déclaration de votre store dans le customData :
```jsx
import customReducer from './custom-reducer'
const store = builder({dataset: rootReducer, customData: customReducer}, [lastNameMiddleware, ownActiondMiddleware], [DevTools.instrument()]);

```

Et voila, le tour est joué. Notre information se trouvera donc dans customData.

- Le connecteur :

Un dernier petit effort, c'est presque fini ! Donc maintenant que notre information est dans notre store, il faut récupérer cette information, souvenez-vous de nos amis les connecteurs. Notre vue doit se connecter à cette information du state, on se place alors dans celle-ci en ce concentrant sur les connecteurs :

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
 Il vous suffit alors de renseigner le noed du state que vous voulez récupérer : `customData` via la fontion selectData (qui permet de récupérer la bonne partie du state) et de vous connecter via la fonction connect de Redux.  
 Et voila, je vous jure que c'est fini , votre information se trouve maintenant dans vos props !

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

Pour une utilisation complète de Focus, il serait bien de ne pas oublier les listes de références. Alors voici un dernier exemple.  Il reprend tout les concepts déjà utilisé, du coup je vais me permettre d'aller un peu plus vite !

On va faire ça en quelques étapes :

- Le service de chargement des listes :

Toujours la même chose c'est un service. Il a été simulé chez nous mais cela correspond à un appel serveur :

```jsx
export const loadCivility = () => Promise.resolve([{code: 'MR', label: 'M.'}, {code: 'MRS', label: 'Mme'}]);
```
- Le fichier de masterDataConfig :
Dans le dossier `config` nous avons donc ajouté un fichier : `master-data-config`, qui contruit l'objet `masterDataConfig` nécessaire au provider MasterData qui permet le chargement des domaines et définitions.

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
