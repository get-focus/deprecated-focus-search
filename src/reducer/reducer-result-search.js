import {capitalize, toUpper} from 'lodash/string';

export const unitResultsSearchReducerBuilder = name => (state = [], action) => {
  const REQUEST_ADVANCED_SEARCH = "REQUEST_"+toUpper(name);
  const RESPONSE_ADVANCED_SEARCH = "RESPONSE_" + toUpper(name);
  const ERROR_ADVANCED_SEARCH = "ERROR_" + toUpper(name);

  switch(action.type) {
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
