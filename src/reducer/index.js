import {unitResultsSearchReducerBuilder} from './reducer-result-search';
import {unitCriteriaSearchReducerBuilder} from './reducer-criteria-search';
import {combineReducers} from 'redux';

export const unitSearchReducerBuilder = (name) => {
  return combineReducers({results : unitResultsSearchReducerBuilder(name), criteria : unitCriteriaSearchReducerBuilder(name)})
}


export const selectSearch = (searchName) => (state ={}) => {
  if( !state[searchName]  ) throw new Error(`SELECTOR_SEARCH : there is no ${searchName}  in the state`);
  return state[searchName]
}
