import {unitResultsSearchReducerBuilder} from './reducer-result-search';
import {unitCriteriaSearchReducerBuilder} from './reducer-criteria-search';
import {combineReducers} from 'redux';

export const unitSearchReducerBuilder = (name) => {
  return combineReducers({results : unitResultsSearchReducerBuilder(name), criteria : unitCriteriaSearchReducerBuilder(name)})
}
