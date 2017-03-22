# La recherche Focus

## Etat des lieux

![search](https://cloud.githubusercontent.com/assets/10349407/19715562/58dc9bbe-9b56-11e6-8225-cdc91d7352f4.PNG)

Le composant de recherche avancée gère automatiquement:

 - La présentation graphique de tous les composants de la recherche avancée, selon la mise en page affichée au dessus
 - L'affichage automatique
	 - des facettes et valeurs (à gauche), fourni en réponse de l'appel du  
	   WS de recherche
	 - de la liste de résultats au centre de l'écran
	 - du nombre de résultats total pour la requête dans résumé (en haut de
	   la liste)
 - Les appels au service de recherche lors
	 - de la modification d'un critère de recherche (scope ou input de
	   recherche)
	 - d'un clic sur une valeur de facette (à gauche)
	 - d'un critère de filtre (dans la barre d'action)
	 - d'un critère de grouping (dans la barre d'action)
	 - d'un critère de sort (dans la barre d'action)
 - La (dé/)selection de toutes les valeurs de la liste de résultat
 - Le store des données de recherche
 - Les actions liés à la recherche

Peu de choses sont à déclarer pour créer une recherche. Tout au long des étapes vous devrez rester cohérent sur le nom de la recherche avancée dans notre exemple ce sera advancedSearch. Ainsi si vous voulez créer un autre recherche dans la même application il vous suffira de refaire ces étapes avec un autre nom.

A la suite de ces étapes, vous aurez dans votre state redux un noeud du nom de votre recherche composé de deux noeuds :
 - criteria correspondant au critère permettant une recherche et envoyé au serveur
 - result correspondant aux résultats renvoyé par votre serveur

## La vue pour le composant Recherche avancée

### Le composant
```
import React from 'react';
import compose from 'lodash/flowRight';
import {connect as connectToSearch} from 'focus-search/behaviours/search';
import {SearchBar} from 'focus-search/components/searchbar';
import {unitSearchActions} from '../../../action/search';
import {AdvancedSearch} from 'focus-search/components/advanced-search';

const searchOptions = {
    searchName : 'advancedSearch',
    unitSearch : unitSearchActions
};

// search bar component connected to search store
const ConnectedSearch = compose(
    connectToSearch(searchOptions)
)(AdvancedSearch);
export default ConnectedSearch;

```
Il suffit pour de connecter le composant en lui indiquant le nom de la recherche avancée et en lui donnant les actions unitaires de votre recherche.

## L'action, le reducer et le middleware

```javascript
 import {actionSearchBuilder} from 'focus-search/actions/action-search-builder'
import {singleActionCreatorBuilder} from 'focus-search/actions/single-action-creator'
import {unitSearchReducerBuilder} from 'focus-search/reducer'
import {searchTriggerMiddlewareBuilder} from 'focus-search/middleware/middleware-search';

import {search as serviceSearch} from '../services/search';

//advanced_search
export const searchAction = actionSearchBuilder({name: 'advancedSearch', type: 'search', service: serviceSearch});
export const {creators : unitSearchActions, types : unitSearchActionsTypes} = singleActionCreatorBuilder('advancedSearch');
export const unitSearchReducers = unitSearchReducerBuilder('advancedSearch')
export const middlewareAdvancedSearch = searchTriggerMiddlewareBuilder(['ADVANCEDSEARCH_UPDATE_QUERY', 'ADVANCEDSEARCH_UPDATE_SELECTED_FACETS', 'ADVANCEDSEARCH_START_SEARCH', 'ADVANCEDSEARCH_UPDATE_GROUP', 'ADVANCEDSEARCH_UPDATE_SORT'], state => state.advancedSearch, searchAction.action);
```

Afin de paramètrer une recherche nous vous conseillons de regrouper la déclaration des reducers des actions et le middleware dans le même fichier. Vous pouvez également les séprarer dans les différents dossiers que vous avez définis pour les autres actions ou reducers de votre application.

###Les actions

L'actionSearchBuilder permet permet de créer l'action de search qui déclanchera une action serveur.
Il suffit de lui donner le nom de la recherche que vous voulez créer (ici : advancedsearch ), de lui indiquer le type d'action que cela réaliser : 'search' et enfin le service permettant de communiquer avec le serveur.

Le singleActionCreatorBuilder permet de construire les différentes actions relatives à une recherche à savoir :

 - la selection de facets
 - le sort
 - le grouping
 - l'action de start d'une recherche
 - le changement de query
 ```
const updateQuery =  (query, replace = false, isSearchAction = true) => ({
	type: UPDATE_QUERY_ADVANCEDSEARCH,
	query: query,
  replace,
  isSearchAction
});

 ```
 Il retourne les différentes actions ainsi créées ainsi que les types.

### Les reducers

Le unitSearchReducerBuilder permet de construire les différents reducers des actions que nous venons de créer. Il suffit pour cela de lui donner à nouveau le nom de la recherche que vous voulez créer.

### Le middleware

le searchTriggerMiddlewareBuilder sert de déclencheur pour la rechercher. Ainsi il prend en premier argument un tableau des différentes actions qui déclenchent une recherche. Dans notre exemple nous avons le changement de query, de sort, de groupe, et de facets. Puis une fonction qui permet de sélectionner le noeud correspondant à votre recherche dans le state redux et enfin l'action de search que vous avez créé avec le actionSearchBuilder.

## Le service

Le service est une promesse permettant d'appeler le serveur. En fonction du scope, il est possible d'appeler différents services comme de la manière suivante :

```javascript

import {parseForVertigo, getScope} from 'focus-search/store';

    search(config) {
        switch (getScope(config)) {
            case 'MOVIE':
                console.log(`[SEARCH MOVIE] config: ${JSON.stringify(config)}`);
                if(config.sort){
                  return fetch(moviesUrl.searchSort(parseForVertigo(config)))
                }

                return fetch(moviesUrl.search(parseForVertigo(config)))
            case 'PERSON':
                console.log(`[SEARCH PERSON] config: ${JSON.stringify(config)}`);
                return fetch(personsUrl.search(parseForVertigo(config)))
            default:
                console.log(`[SEARCH ALL] config: ${JSON.stringify(config)}`);
                return fetch(commonUrl.search(parseForVertigo(config))).then(data =>{  return data} );
        }
    }
```
 Deux fonctions sont à appeler pour cela :

 - Le getScope permettant de récuper le scope dans l'object config,
 - le parseForVertigo qui permet de créer l'objet attendu par le serveur


## Le provider et le store

De le même façon que les autres providers de l'application, le search a besoin d'informations statiques que vous devez lui fournir et qui sont décrites dans le paragraphe métadonnées.
```javascript
class Application extends Component {
    render() {
        const {history, store} = this.props;
        return (
            <StoreProvider store={store}>
                <MetadataProvider definitions={definitions} domains={domains}>
                    <FieldHelpersProvider>
                        <MasterdataProvider configuration={masterdatas}>
                            <SearchProvider store={store} searchMetadata={configSearch}>
                                <Router history={history} routes={routes} />
                            </SearchProvider>
                        </MasterdataProvider>
                    </FieldHelpersProvider>
                </MetadataProvider>
            </StoreProvider>
        );
    }
}
```

Vous devez également renseigner le nœud du nom de la rercherche que vous avez choisi lors de la création du store ainsi que le middleware:
```javascript

import {unitSearchReducers} from '../action/search';
import {middlewareAdvancedSearch} from '../action/search';

export default createStore(
    {
        advancedSearch : unitSearchReducers,
        dataset: rootReducer,
        messages: messageReducer,
        header: headerReducer,
        confirm: confirmReducer,
        fetch: fetchReducer
    },
    [middlewareAdvancedSearch],
    [DevTools.instrument()]
);

```
## Les metadonnées

Il est conseillé pour cette partie de créer un dossier métadonnées dans  votre dossier search.

Voici l'index de ce fichier que vous devez importer pour le provider de search.
```
import defaultMetadatas from './default-metadatas';
import movieMetadatas from './movie-metadatas';
import personMetadatas from './person-metadatas';
import scopes from './scopes';



const listMetadata = (listType, list) => {
    switch (listType) {
        case 'MovieIndex':
            return movieMetadatas;
        case 'PersonIndex':
            return personMetadatas;
        default:
            return defaultMetadatas;
    };
};


export default {
    getListMetadata: listMetadata,
    scopes: scopes
};
```

Il défini deux concepts celui de scopes et la fonction getListMetada.

#### Les scopes :

```

export default [
    {
        value: 'ALL',
        label: 'All',
        selected:true
    },
    {
        value: 'MOVIE',
        label: 'Films',
        selected: false
    },
    {
        value: 'PERSON',
        label: 'Acteurs',
        selected: false
    }
];

```

#### La fonction getListMetadata

```
const listMetadata = (listType) => {
    switch (listType) {
        case 'MovieIndex':
            return movieMetadatas;
        case 'PersonIndex':
            return personMetadatas;
        default:
            return defaultMetadatas;
    };
};

```
Cette fonction doit retourner en fonction du listType les différentes données nécessaire. Il y a autant de listType que de scope.
 Par exemple pour le MovieIndex voici les données à fournir :

```
import React, {PropTypes} from 'react';
import {compose} from 'redux';
import {connect as connectToState} from 'react-redux';
import {connect as connectToMetadata} from 'focus-graph/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-graph/behaviours/field';
import {selectFieldsByFormKey} from 'focus-graph/store/create-store';
import {buildFieldForLineSearch} from 'focus-search/store'


import get from 'lodash/get';
import identity from 'lodash/identity'


function PureMovieLine ({textFor, ...props}) {
    const code = 0;
    return (
        <div key={code} data-demo='movie-line'>
          <div className='level1'>{textFor('title', {entityPath: 'movie'})}</div>
          <div className='level2'>{textFor('movieType', {entityPath: 'movie'})}</div>
          <div className='level3'>{textFor('productionYear', {entityPath: 'movie'})}</div>
        </div>
    );
};

const config = {
  searchName: 'advancedSearch',
  codeId : 'movId',
  entityPath: 'movie',
  code: 'MOVIE'
}

const MovieLine = compose(
  connectToMetadata(['movie']),
  connectToState(buildFieldForLineSearch(config)),
  connectToFieldHelpers()
)(PureMovieLine);


export default {
    lineIdentifierProperty : 'movId',
    ActionsComponent: props => (<button>Test</button>),
    LineComponent: props => (<MovieLine {...props} />),

    sortList : [
        'TITLE_SORT_ONLY',

    ],
    groupList: [
        {code: 'FCT_MOVIE_TYPE', label: 'Movie Type'}
    ]
};


```

Il n'y a que le LineComponent d'obligatoire. Le lineIdentifier vaut "id" par default. L'ActionsComponent defini le composant que vous pouvez ajouter et apparaitra au survol d'une ligne, il est également possible de lui donner un tableau d'actionsLine de la façon suivante :
```
    actionsLine: [
        {label: 'Yo', icon: 'print', action: () => {console.log('action')}},
        {label: 'La', icon: 'print', action: () => {console.log('action')}}
    ]
```
Permettant ainsi de créer autant de boutons que d'éléments présents dans le tableau.
Le sortList et le groupList permet d'ajouter la liste des sort disponible ou des groupes.

Pour les lignes, il est possible d'utiliser les connect de focus-graph pour afficher vos données et avoir accès ainsi aux formatteurs. Pour cela il est nécessaire d'utiliser le buildFieldForLineSearch pour formatter les données pour les helpers de field comme textFor.
