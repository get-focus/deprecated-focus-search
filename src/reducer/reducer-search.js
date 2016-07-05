import {capitalize, toUpper} from 'lodash/string';

export const unitSearchReducerBuilder = name => (state = [], action) => {

  const UPDATE_QUERY_SEARCH =  toUpper(name)+"_UPDATE_QUERY";
  const UPDATE_FACETS_SEARCH =  toUpper(name)+"_UPDATE_FACETS";
  const UPDATE_SCOPE_SEARCH =  toUpper(name)+"_UPDATE_SCOPE";
  const UPDATE_SELECTED_FACETS_SEARCH =  toUpper(name)+"_UPDATE_SELECTED_FACETS";
  const REQUEST_ADVANCED_SEARCH = "REQUEST_"+toUpper(name);
  const RESPONSE_ADVANCED_SEARCH = "RESPONSE_" + toUpper(name);
  const ERROR_ADVANCED_SEARCH = "ERROR_" + toUpper(name);

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
   case REQUEST_ADVANCED_SEARCH:
     return state.length > 0 ? state.map(search => {
        return {
         ...search,
         gloire : 'tentative'
         }
       }) : [{gloire : 'tentative'}]
   case RESPONSE_ADVANCED_SEARCH:
   return state.length > 0 ? state.map(search => {
      return {
       ...search,
       facets: action.payload[0].facets,
       gloire : 'victoire'
       }
     }) : [{gloire : 'victoire'}]
   case ERROR_ADVANCED_SEARCH:
     return state.length > 0 ? state.map(search => {
        return {
         ...search,
         gloire : 'echec'
         }
       }) : [{gloire : 'echec'}]
    default:
      return state;
  }

}
