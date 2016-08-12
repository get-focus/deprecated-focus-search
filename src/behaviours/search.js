
import React, {Component, PropTypes} from 'react';
import {connect as connectToState} from 'react-redux';
import {compose} from 'redux';
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
      const  _sort = (element) => {
        dispatch(updateSort(element))
      }
      const _group = (element) => {
        dispatch(updateGroup(element))
      }
      const _facet = (element, replace) => {
        dispatch(updateSelectedFacets(element, replace))
      }
      const _query = (element) => {
        dispatch(updateQuery(element))
      }
      //List ! =)
      if(isArray(props.results.data)){
        const groups = props.results.data;
        const groupsWithLineAndToolBar = groups.map(element => {
           const {LineComponent, sortList, groupList} = searchMetadata.getLineComponentFromContentTypeExample( element.contentType, element.values)
           return {
             ...element,
             LineComponent,
             sortList,
             groupList
           }
        })
        return <ComponentToConnect group={_group}
                  query={_query}
                  facet={_facet}
                  values={props.results.data.values}
                  groupsWithLineAndToolBar={groupsWithLineAndToolBar}
                  data={facetListWithselectedInformation(props)}
                  sort={_sort}
                  />
      }else {
        const metaDataProps = searchMetadata.getLineComponentFromContentTypeExample( props.results.data.contentType, props.results.data.values);
        return <ComponentToConnect group={_group}
                  query={_query}
                  facet={_facet}
                  values={props.results.data.values}
                  data={facetListWithselectedInformation(props)}
                  metaDataProps={metaDataProps}
                  sort={_sort}
                  searchMetadata={searchMetadata}
                  LineComponent={metaDataProps.LineComponent}
                  />
      }

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
