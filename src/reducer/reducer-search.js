import {UPDATE_QUERY, UPDATE_FACETS, UPDATE_SCOPE, UPDATE_SELECTED_FACETS} from '../actions/action-search';
const search = (state = [], action) => {
   switch(action.type) {
	   case UPDATE_QUERY:

  		return state.length > 0 ? state.map(search => {
         return {
          ...search,
          query : action.query
          }
        }) : [{query: action.query}]
        return result;
     case UPDATE_FACETS:
       return state.length > 0 ? state.map(search => {
          return {
           ...search,
           facets : action.facets
           }
         }) : [{facets: action.facets}]
         return result;
     case UPDATE_SCOPE:
     return state.length > 0 ? state.map(search => {
        return {
         ...search,
         scope : action.scope
         }
       }) : [{scope: action.scope}]
     case UPDATE_SELECTED_FACETS:
        return state.length > 0 ? state.map(search => {
          return {
           ...search,
           selectedFacets : action.selectedFacets
           }
         }) : [{selectedFacets: action.selectedFacets}]
       return result;
    case 'REQUEST_SEARCH_ADVANCED_SEARCH':
      return [
        ...state,
        {gloire: 'tentative'}
      ];
    case 'RESPONSE_SEARCH_ADVANCED_SEARCH':
      return [
        ...state,
        {gloire: 'victoire'}
      ];
    case 'ERROR_SEARCH_ADVANCED_SEARCH':
      return [
        ...state,
        {gloire: 'echec'}
      ];
	   default:
		   return state;
   }
};
export default search;
