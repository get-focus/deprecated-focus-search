import {capitalize, toUpper} from 'lodash/string';

export const unitCriteriaSearchReducerBuilder = name => (state = [], action) => {

  const UPPER_NAME = toUpper(name);
  const UPDATE_QUERY_SEARCH =  `${toUpper(name)}_UPDATE_QUERY`;
  const UPDATE_SORT_SEARCH =  `${toUpper(name)}_UPDATE_SORT`;
  const UPDATE_GROUP_SEARCH =  `${toUpper(name)}_UPDATE_GROUP`;
  const UPDATE_SELECTED_FACETS_SEARCH =  `${toUpper(name)}_UPDATE_SELECTED_FACETS`;

  switch(action.type) {
    case UPDATE_QUERY_SEARCH:

        return {
         ...state,
         query : action.query
         }
    case UPDATE_SORT_SEARCH :
       return {
        ...state,
        scope : action.scope
        }
    case UPDATE_SELECTED_FACETS_SEARCH:
      return action.replace ? {
         ...state,
         selectedFacets : state.selectedFacets.reduce((select, newValue) => {
           if(newValue !== action.selectedFacets) select.push(newValue)
           return select;
         }, [])
       } : ((state.selectedFacets && state.selectedFacets.length > 0) ?
           {
           ...state,
           selectedFacets : [...state.selectedFacets, action.selectedFacets ]
           }
        :  {
         ...state,
         selectedFacets : [ action.selectedFacets ]
         })
    default:
      return state;
  }

}


// State selectors

export const selectSearchCriteriaByName = (searchName, name) => (state = {}) => {
  if( !state[searchName] || !state[searchName] .criteria[name] ) throw new Error(`SELECTOR_CRITERIA_SEARCH : there is no ${searchName} or ${name} in the state`);
  return state[searchName].criteria[name]
}

export const selectSearchCriteria = (searchName) => (state = {}) => {
  if( !state[searchName] || !state[searchName].criteria) throw new Error(`SELECTOR_CRITERIA_SEARCH : there is no ${searchName} in the state`);
  return state[searchName].criteria
}
