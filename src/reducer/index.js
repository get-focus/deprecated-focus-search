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

// cpmpose :+1
export function facetListWithselectedInformation(state) {
  const selectedFacets = state.criteria.selectedFacets || [];
  const facets = state.results.facets || [];
  // TODO: Check the selected value presence
  return {
    data: facets.map(facetDescriptor => (selectedFacets[facetDescriptor.code]) ? {...facetDescriptor,selectedFacets: selectedFacets[facetDescriptor.code], selected: true} : facetDescriptor)
  }
}

export const FACET_SHAPE_TYPE = {
  code: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.number
};

export const FACET_DESCRIPTOR_SHAPE_TYPE = {
    code: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape(FACET_SHAPE_TYPE)),
    label: PropTypes.string,
  };

export const SEARCH_STATE_TYPE = {
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
    facets: PropTypes.arrayOf(PropTypes.shape(FACET_DESCRIPTOR_SHAPE_TYPE)),
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        label: PropTypes.string,
        totalCount: PropTypes.number,
        list: PropTypes.arrayOf(PropTypes.object),
        listType: PropTypes.string.isRequired
      })),
      PropTypes.shape({
        totalCount: PropTypes.number,
        listType: PropTypes.string.isRequired,
        list: PropTypes.arrayOf(PropTypes.object)
      })
    ])
  }
}
