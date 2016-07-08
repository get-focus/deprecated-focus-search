import {capitalize, toUpper} from 'lodash/string';

export const unitCriteriaSearchReducerBuilder = name => (state = [], action) => {

  const UPDATE_QUERY_SEARCH =  toUpper(name)+"_UPDATE_QUERY";
  const UPDATE_FACETS_SEARCH =  toUpper(name)+"_UPDATE_FACETS";
  const UPDATE_SCOPE_SEARCH =  toUpper(name)+"_UPDATE_SCOPE";
  const UPDATE_SELECTED_FACETS_SEARCH =  toUpper(name)+"_UPDATE_SELECTED_FACETS";
  const DELETE_SELECTED_FACETS_SEARCH = toUpper(name)+"_DELETE_SELECTED_FACETS";


  switch(action.type) {
    case UPDATE_QUERY_SEARCH:

        return {
         ...state,
         query : action.query
         }
    case UPDATE_FACETS_SEARCH:
         return {
          ...state,
          facets : action.facets
          }
    case UPDATE_SCOPE_SEARCH:
       return {
        ...state,
        scope : action.scope
        }
    case DELETE_SELECTED_FACETS_SEARCH:
       return {
        ...state,
        selectedFacets : state.selectedFacets.reduce((select, newValue) => {
          if(newValue !== action.selectedFacets) select.push(newValue)
          return select;
        }, [])
        }
    case UPDATE_SELECTED_FACETS_SEARCH:

    return (state.selectedFacets && state.selectedFacets.length > 0) ?
        {
        ...state,
        selectedFacets : [...state.selectedFacets, action.selectedFacets ]
        }
     :  {
      ...state,
      selectedFacets : [ action.selectedFacets ]
      }

    default:
      return state;
  }

}

export const selectSearchCriteriaByName = (searchName, name) => (state ={}) => {
  if( !state[searchName] || !state[searchName] .criteria[name] ) throw new Error(`SELECTOR_CRITERIA_SEARCH : there is no ${searchName} or ${name} in the state`);
  return state[searchName].criteria[name]
}

export const selectSearchCriteria = (searchName) => (state ={}) => {
  if( !state[searchName] || !state[searchName].criteria) throw new Error(`SELECTOR_CRITERIA_SEARCH : there is no ${searchName} in the state`);
  return state[searchName].criteria
}
