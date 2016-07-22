import {unitResultsSearchReducerBuilder} from './reducer-result-search';
import {unitCriteriaSearchReducerBuilder} from './reducer-criteria-search';
import {combineReducers} from 'redux';
import {PropTypes} from 'react';

export const unitSearchReducerBuilder = (name) => {
  return combineReducers({results : unitResultsSearchReducerBuilder(name), criteria : unitCriteriaSearchReducerBuilder(name)})
}


export const selectSearch = (searchName) => (state ={}) => {
  if( !state[searchName]  ) throw new Error(`SELECTOR_SEARCH : there is no ${searchName}  in the state`);
  return state[searchName]
}

const SEARCH_STATE_TYPE = {
  criteria: PropTypes.shape({
    selectedFacets: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      values: PropTypes.arrayOf(PropTypes.string)
    })),
    query: PropTypes.object,
    group: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string})),
    sort: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string, order: PropTypes.string}))
  }),
  results: {
    //highlights: PropTypes.arrayOf(PropTypes.object),
    facets: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.shape({
          code: PropTypes.string,
          label: PropTypes.string,
          count: PropTypes.number
        })),
        label: PropTypes.string,
      })
    ),
    data: PropTypes.oneOfType([
      PropTypes.shape({
        code: PropTypes.string,
        label: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.object)
      }),
      PropTypes.arrayOf(PropTypes.object)
    ])
  }
}
