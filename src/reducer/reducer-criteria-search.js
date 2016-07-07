import {capitalize, toUpper} from 'lodash/string';

export const unitCriteriaSearchReducerBuilder = name => (state = [], action) => {

  const UPDATE_QUERY_SEARCH =  toUpper(name)+"_UPDATE_QUERY";
  const UPDATE_FACETS_SEARCH =  toUpper(name)+"_UPDATE_FACETS";
  const UPDATE_SCOPE_SEARCH =  toUpper(name)+"_UPDATE_SCOPE";
  const UPDATE_SELECTED_FACETS_SEARCH =  toUpper(name)+"_UPDATE_SELECTED_FACETS";

  switch(action.type) {
    case UPDATE_QUERY_SEARCH:

     return state.length > 0 ? state.map(search => {
        return {
         ...search,
         query : action.query
         }
       }) : [{query: action.query}]
    case UPDATE_FACETS_SEARCH:
      return state.length > 0 ? state.map(search => {
         return {
          ...search,
          facets : action.facets
          }
        }) : [{facets: action.facets}]
        return result;
    case UPDATE_SCOPE_SEARCH:
    return state.length > 0 ? state.map(search => {
       return {
        ...search,
        scope : action.scope
        }
      }) : [{scope: action.scope}]
    case UPDATE_SELECTED_FACETS_SEARCH:
       return state.length > 0 ? state.map(search => {
         return {
          ...search,
          selectedFacets : action.selectedFacets
          }
        }) : [{selectedFacets: action.selectedFacets}]
    default:
      return state;
  }

}

// It  extracts data from the dataset part of the state
export const selectSearchCriteriaByName = (searchName, name) => (state ={}) => {
  if( !state[searchName] || !state[searchName] .criteria[name] ) throw new Error(`SELECTOR_CRITERIA_SEARCH : there is no ${searchName} or ${name} in the state`);
  return state[searchName].criteria[name]
}

export const selectSearchCriteria = (searchName) => (state ={}) => {
  console.log(state[searchName])
  if( !state[searchName] || !state[searchName].criteria) throw new Error(`SELECTOR_CRITERIA_SEARCH : there is no ${searchName} in the state`);
  return state[searchName].criteria
}
