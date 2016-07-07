const SEARCH_UPDATE_QUERY = 'SEARCH_UPDATE_QUERY';
const DEFAULT_LISTEN_TYPES = ['QUERY'/*, SELECTEDFACETS*/ ]
import {capitalize, toUpper} from 'lodash/string';

export const builderAdvancedSearchMiddleware = (searchActionAdvancedSearch, name, listenedTypes = DEFAULT_LISTEN_TYPES) =>  {
  const searchObjectAction = listenedTypes.map((element)=> toUpper(name)+"_UPDATE_"+element);
  const UPDATE_QUERY_SEARCH =  toUpper(name)+"_UPDATE_QUERY";
  return  store => next => action => {
    const {search} = store.getState();
    if(searchObjectAction.indexOf(action.type) !== -1){
        next(action);
        store.dispatch(searchActionAdvancedSearch.action(search))
    }else {
        next(action);
    }
  }
}
