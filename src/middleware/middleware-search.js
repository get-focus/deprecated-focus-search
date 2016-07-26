import {capitalize, toUpper} from 'lodash/string';
import {isArray, isFunction,isString, isObject} from 'lodash/lang';
const DEFAULT_LISTEN_TYPES = ['QUERY'/*, SELECTEDFACETS*/ ]
const SEARCH_UPDATE_QUERY = 'SEARCH_UPDATE_QUERY';
const SEARCH_TRIGGER_MIDDLEWARE_BUILDER = 'SEARCH_TRIGGER_MIDDLEWARE_BUILDER';
const STRING_EMPTY = '';



const _validateActionBuilderParams = (
    actionsWhichTriggerTheSearch,
    stateSearchSelector,
    searchActionAdvancedSearch
  ) => {
    if(!isObject(actionsWhichTriggerTheSearch) && !isArray(actionsWhichTriggerTheSearch)){
      throw new Error(`${SEARCH_TRIGGER_MIDDLEWARE_BUILDER}: the actionsWhichTriggerTheSearch parameter should be an object or array.`);
    }
    if(!isFunction(stateSearchSelector)){
      throw new Error(`${SEARCH_TRIGGER_MIDDLEWARE_BUILDER}: the stateSearchSelector parameter should be a function.`);
    }
    if(!isFunction(searchActionAdvancedSearch)) {
        throw new Error(`${SEARCH_TRIGGER_MIDDLEWARE_BUILDER}: the stateSearchSelector parameter should be a function.`);
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
  actionsWhichTriggerTheSearch, /*= ['SEARCH_UPDATE_QUERY', 'SEARCH_UPDATE_SELECTED_FACETS']*/
  stateSearchSelector, /*= state => state.search*/
  searchAction
) =>  {
  // Validate params.
  _validateActionBuilderParams(
    actionsWhichTriggerTheSearch,
    stateSearchSelector,
    searchAction
  );
  const _actionWhichTriggerTheSearch = isArray(actionsWhichTriggerTheSearch) ? actionsWhichTriggerTheSearch : Object.keys(actionsWhichTriggerTheSearch);

  // Creates a middleware given a redux store, the next action and the current action.
  return  store => next => action => {

    if(_actionWhichTriggerTheSearch.includes(action.type)){
      // search selector
        next(action);
        const {criteria} = stateSearchSelector(store.getState());
        store.dispatch(searchAction(criteria))
    }else {
        next(action);
    }
  }
}
