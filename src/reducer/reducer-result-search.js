import {capitalize, toUpper} from 'lodash/string';

export const parseResults = (results = {}) => {
  const hasGroups = results.groups !== undefined;
  let newResults = {totalCount: results.totalCount, hasGroups, listType: results.listType};

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
//
//
const FAKE_DATA = [
  {
    code: 'GENS_LEVEL',
    label: 'Niveau des gens',
    values: [
      {code: 'FAIBLE', label: 'faible', count: 22},
      {code: 'MOYEN', label: 'moyen', count: 54},
      {code: 'FORT', label: 'fort', count: 7}
    ]
  },
  {
    code: 'SALAIRE',
    label: 'Salaire des gens',
    values: [
      {code: 'PAS_CHER', label: 'pas cher', count: 45},
      {code: 'DANS_LA_FOURCHETTE', label: 'dans la moyennt', count: 4},
      {code: 'CHER', label: 'très cher', count: 2}
    ]
  },

];

const FAKE_DATA_LIST = [
  {id: 1, firstName: 'Don Rodrigo', age: 12},
  {id: 2, firstName: 'Don Stefano', age: 87},
  {id: 3, firstName: 'Don Roberto', age: 46},
  {id: 4, firstName: 'Don Michello', age: 22}
];


export const unitResultsSearchReducerBuilder = (name, resultParser = parseResults) => (state = {}, action = {}) => {
  const _UPPER_NAME = toUpper(name);
  const REQUEST_SEARCH = `REQUEST_${_UPPER_NAME}`;
  const RESPONSE_SEARCH = `RESPONSE_${_UPPER_NAME}`;
  const ERROR_SEARCH = `ERROR_${_UPPER_NAME}`;
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
