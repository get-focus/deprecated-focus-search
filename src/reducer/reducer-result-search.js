import {capitalize, toUpper} from 'lodash/string';

export const parseResults = (results = {}) => {
  const hasGroups = results.groups !== undefined;
  let newResults = {totalCount: results.totalCount, hasGroups};
  /* Populate the new results depending */
  if(hasGroups){
    newResults.data = results.groups;
  } else {
    newResults.data = results.list;
  }
  if(results.facets){
    newResults.facets = results.facets;
  }
  if(results.highlights){
    newResults.highlights = results.highlights;
  }

  return newResults;
}

// Build a single search result reducer builder
// Example call
// unitResultsSearchReducerBuilder('search');
//
//
//
export const unitResultsSearchReducerBuilder = (name, resultParser = parseResults) => (state = {}, action = {}) => {
  const _UPPER_NAME = toUpper(name);
  const REQUEST_SEARCH = `REQUEST_SEARCH_${_UPPER_NAME}`;
  const RESPONSE_SEARCH = `RESPONSE_SEARCH_${_UPPER_NAME}`;
  const ERROR_SEARCH = `ERROR_SEARCH_${_UPPER_NAME}`;
  const {error, ...otherStatePart} = state;
  switch(action.type) {
    case REQUEST_SEARCH:
         return {
           ...otherStatePart,
           searching: true
          };
    case RESPONSE_SEARCH:
        return {
          searching: false,
          ...parseResults(action.payload)
        };
    case ERROR_SEARCH:
         return {
           ...otherStatePart,
           searching: false,
           //TODO:  to be discussed
           error: action.payload
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
