const SEARCH_UPDATE_QUERY = 'SEARCH_UPDATE_QUERY';
const DEFAULT_LISTEN_TYPES = ['QUERY'/*, SELECTEDFACETS*/ ]
import {capitalize, toUpper} from 'lodash/string';
import {isArray, isFunction,isString, isObject} from 'lodash/lang';
const SEARCH_MIDDLEWARE_BUILDER = 'SEARCH_MIDDLEWARE_BUILDER';
const STRING_EMPTY = '';



const _validateActionBuilderParams = ({searchActionAdvancedSearch, name, listenedTypes}) => {
    if(!isObject(searchActionAdvancedSearch)) {
        throw new Error(`${SEARCH_MIDDLEWARE_BUILDER}: the searchActionAdvancedSearch parameter should be a object.`);
    }
    if(!isString(name) || STRING_EMPTY === name) {
        throw new Error(`${SEARCH_MIDDLEWARE_BUILDER}: the name parameter should be a string`);
    }
    if(!isArray(listenedTypes)){
      throw new Error(`${SEARCH_MIDDLEWARE_BUILDER}: the listenedTypes parameter should be an array.`);
    }
}



export const builderAdvancedSearchMiddleware = (searchActionAdvancedSearch, name, listenedTypes = DEFAULT_LISTEN_TYPES) =>  {
  _validateActionBuilderParams({searchActionAdvancedSearch, name, listenedTypes});
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
