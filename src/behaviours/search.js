
import React, {Component, PropTypes} from 'react';
import {connect as connectToState} from 'react-redux';
import {compose} from 'redux';
import {map} from 'lodash/map'
import {loadLine} from '../actions/single-action-creator';

import isArray from 'lodash/isArray';

const SEARCH_CONTEXT_TYPE = {
  searchMetadata: PropTypes.object

};

export function facetListWithselectedInformation(state) {
  const selectedFacets = state.criteria.selectedFacets || [];
  const facets = state.results.facets || [];
  // TODO: Check the selected value presence
  return  facets.map(facetDescriptor => (selectedFacets[facetDescriptor.code]) ? {...facetDescriptor,selectedFacets: selectedFacets[facetDescriptor.code], selected: true} : facetDescriptor)

}

export function connect(searchOptions) {
  return function getSearchConnectedComponent(ComponentToConnect){
    function SearchConnectedComponent(props, context){
      const {searchMetadata} = context;
      const {dispatch} = props;
      const {store} = context;
      const {unitSearch: {updateSort, updateGroup, updateSelectedFacets, updateQuery}} = searchOptions;
      //TO DO REPLACE ON EACH ACTIONS
      const unitSearchDispatch = {
        sort: (element) => {
          dispatch(updateSort(element))
        },
        group: (element) => {
          dispatch(updateGroup(element))
        },
        facet: (element, replace) => {
          dispatch(updateSelectedFacets(element, replace))
        },
        query :(element) => {
          dispatch(updateQuery(element))
        }
      }
      //List ! =)
      let results = {};
      if(props.results.hasGroups){
        const groups = props.results.data;
         results = groups.map(element => {
           const {LineComponent, sortList, groupList} = searchMetadata.getLineComponentFromContentTypeExample( element.contentType, element.values)
           return {
             ...element,
             LineComponent,
             sortList,
             groupList
           }
        })
      }else {
        const metaDataProps = searchMetadata.getLineComponentFromContentTypeExample( props.results.data.contentType, props.results.data.values);
         results ={
          values: props.results.data.values,
          groupList: searchMetadata.groupList,
          sortList: searchMetadata.sortList,
          LineComponent: metaDataProps.LineComponent
        }

      }
      return <ComponentToConnect
                isGroup={props.results.isGroup}
                valuesForResults={results}
                facetListWithselectedInformation={facetListWithselectedInformation(props)}
                unitSearchDispatch={unitSearchDispatch}
                />

    }
    SearchConnectedComponent.displayName= 'SearchConnectedComponent';
    SearchConnectedComponent.contextTypes = SEARCH_CONTEXT_TYPE;
    SearchConnectedComponent.PropTypes = {
      results : PropTypes.object.isRequired
    }
    return compose (
      connectToState(s=> s[searchOptions.searchName])
    )(SearchConnectedComponent);
  }
}

class SearchProvider extends Component {
    getChildContext() {
        return {
          searchMetadata : this.props.searchMetadata
        };
    }
    render() {
        return this.props.children;
    }
}

SearchProvider.childContextTypes = SEARCH_CONTEXT_TYPE;
SearchProvider.propTypes = {
    searchMetadata: PropTypes.object.isRequired
};
export const Provider = SearchProvider;
