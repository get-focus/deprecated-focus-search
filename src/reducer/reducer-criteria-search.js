import {capitalize, toUpper} from 'lodash/string';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith'
export const unitCriteriaSearchReducerBuilder = (name, reduceQuery) => (state = {}, action) => {

  const UPPER_NAME = toUpper(name);
  const UPDATE_QUERY_SEARCH =  `${toUpper(name)}_UPDATE_QUERY`;
  const UPDATE_SORT_SEARCH =  `${toUpper(name)}_UPDATE_SORT`;
  const UPDATE_GROUP_SEARCH =  `${toUpper(name)}_UPDATE_GROUP`;
  const UPDATE_SELECTED_FACETS_SEARCH =  `${toUpper(name)}_UPDATE_SELECTED_FACETS`;

  switch(action.type) {
    case UPDATE_QUERY_SEARCH:
      if(reduceQuery) {
        return reduceQuery(state, action);
      }else {
        if(action.replace) return {
          ...state,
          query: {}
        }
        return {
          ...state,
          query : {
            ...state.query,
            ...action.query
          }
        }
    }


     case UPDATE_GROUP_SEARCH:
       let newGroup = [action.group]
       if(state.group) newGroup = [...state.group, action.group]
     return action.replace ? {
       ...state,
       group: differenceWith(state.group, [action.group], isEqual)
     } : {
       ...state,
       group : newGroup
     }
    case UPDATE_SORT_SEARCH :
      let newSort = [action.sort]
      if(state.sort) newSort.sort = [...state.sort, action.sort]
       return action.replace ? {
         ...state,
         sort: differenceWith(state.sort, [action.sort], isEqual)
       } : {
         ...state,
         sort: newSort
       }
    case UPDATE_SELECTED_FACETS_SEARCH:
      let newSelectedFacets = [action.selectedFacets]
      if(state.selectedFacets) newSelectedFacets = [...state.selectedFacets, action.selectedFacets]
      return action.replace ? {
         ...state,
         selectedFacets : differenceWith(state.selectedFacets, [action.selectedFacets], isEqual)
       } :  {
         ...state,
         selectedFacets : newSelectedFacets
         }
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
