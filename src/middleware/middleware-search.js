import {capitalize, toUpper} from 'lodash/string';
import {isArray, isFunction,isString, isObject} from 'lodash/lang';
const DEFAULT_LISTEN_TYPES = ['QUERY'/*, SELECTEDFACETS*/ ]
const SEARCH_UPDATE_QUERY = 'SEARCH_UPDATE_QUERY';
const SEARCH_TRIGGER_MIDDLEWARE_BUILDER = 'SEARCH_TRIGGER_MIDDLEWARE_BUILDER';
const STRING_EMPTY = '';



const _validateActionBuilderParams = (
    searchActionAdvancedSearch,
    stateSearchSelector,
    actionsWhichTriggerTheSearch
  ) => {
    if(!isFunction(searchActionAdvancedSearch)) {
        throw new Error(`${SEARCH_TRIGGER_MIDDLEWARE_BUILDER}: the searchActionAdvancedSearch parameter should be a function.`);
    }
    if(!isFunction(stateSearchSelector)){
      throw new Error(`${SEARCH_TRIGGER_MIDDLEWARE_BUILDER}: the stateSearchSelector parameter should be a function.`);
    }

    if(!isObject(actionsWhichTriggerTheSearch) || !isArray(actionsWhichTriggerTheSearch)){
      throw new Error(`${SEARCH_TRIGGER_MIDDLEWARE_BUILDER}: the actionsWhichTriggerTheSearch parameter should be an object or array.`);
    }
}


/*
 The purpose of the builder is to take a search function, trigger actions and launch the search when they are called.
 Example call:
 searchTriggerMiddlewareBuilder(
 searchService,
 state => state.advancedSearch,
 [] => Be aware that if you pass the actionsWhichTriggerTheSearch as an object it should be the types result of the state action builder.
)
*/
export const searchTriggerMiddlewareBuilder = (
  searchAction,
  stateSearchSelector = state => state.search,
  actionsWhichTriggerTheSearch = ['SEARCH_UPDATE_QUERY', 'SEARCH_UPDATE_SELECTED_FACETS']
) =>  {
  // Validate params.
  _validateActionBuilderParams(
    searchAction,
    stateSearchSelector,
    actionsWhichTriggerTheSearch
  );
  const _actionWhichTriggerTheSearch = isArray(actionsWhichTriggerTheSearch) ? actionsWhichTriggerTheSearch : Object.keys(actionsWhichTriggerTheSearch);

  // Creates a middleware given a redux store, the next action and the current action.
  return  store => next => action => {

    if(_actionWhichTriggerTheSearch.includes(action.type)){
      // search selector
      const extractedStatePart = stateSearchSelector(store.getState());
        next(action);
        store.dispatch(searchAction(extractedStatePart))
    }else {
        next(action);
    }
  }
}
