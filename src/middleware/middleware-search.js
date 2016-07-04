const SEARCH_UPDATE_QUERY = 'SEARCH_UPDATE_QUERY';

import {capitalize, toUpper} from 'lodash/string';

export const builderAdvancedSearchMiddleware = (searchActionAdvancedSearch, name) =>  {
  const UPDATE_QUERY_SEARCH =  toUpper(name)+"_UPDATE_QUERY";
  return  store => next => action => {
    const {search} = store.getState();
    switch (action.type) {
      case UPDATE_QUERY_SEARCH:
          next(action);
          store.dispatch(searchActionAdvancedSearch.action(search))
      default:
        next(action);
        break;
    }
  }
}
