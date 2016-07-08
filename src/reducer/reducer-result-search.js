import {capitalize, toUpper} from 'lodash/string';

export const unitResultsSearchReducerBuilder = name => (state = {}, action) => {
  const REQUEST_ADVANCED_SEARCH = "REQUEST_"+toUpper(name);
  const RESPONSE_ADVANCED_SEARCH = "RESPONSE_" + toUpper(name);
  const ERROR_ADVANCED_SEARCH = "ERROR_" + toUpper(name);

  switch(action.type) {
    case REQUEST_ADVANCED_SEARCH:
         return {
            ...state,
            gloire : 'tentative'
          }

    case RESPONSE_ADVANCED_SEARCH:
       return {
          ...state,
          facets: action.payload[0].facets,
          list:action.payload[0].list,
          gloire : 'victoire'
        }

    case ERROR_ADVANCED_SEARCH:
         return {
            ...state,
            gloire : 'echec'
          }

    default:
      return state;
  }

}


// It  extracts data from the dataset part of the state
export const selectSearchResultByName = (searchName, name) => (state ={}) => {
  if( !state[searchName] || !state[searchName].results[name] ) throw new Error(`SELECTOR_RESULTS_SEARCH : there is no ${searchName} or ${name} in the state`);
  return state[searchName].results[name]
}

export const selectSearchResult = (searchName) => (state ={}) => {
  if( !state[searchName] || !state[searchName].results) throw new Error(`SELECTOR_RESULTS_SEARCH : there is no ${searchName}  in the state`);
  return state[searchName].results
}
