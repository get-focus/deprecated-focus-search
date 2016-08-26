import React, {Component, PropTypes} from 'react';
import {connect as connectToState} from 'react-redux';
import {compose} from 'redux';
import {map} from 'lodash/map'
import isArray from 'lodash/isArray';
import {loadLine} from '../actions/single-action-creator';

const SEARCH_CONTEXT_TYPE = {
  searchMetadata: PropTypes.object
};

// Maybe this function should take the facets and the selectedFacets only.
export function facetListWithselectedInformation(state) {
  const selectedFacets = state.criteria.selectedFacets || [];
  const facets = state.results.facets || [];
  // TODO: Check the selected value presence
  return {
    facetListWithselectedInformation : facets.map(facetDescriptor => (selectedFacets[facetDescriptor.code]) ?
                      {...facetDescriptor,selectedFacets: selectedFacets[facetDescriptor.code], selected: true} : facetDescriptor) ,
    selectedFacetsList :  selectedFacets
  }
}

export function getResultsForGroup(groups, searchMetadata){
   results = groups.map(element => {
     // TODO: searchMetadataProvider => getListMetadata in data, and get sorts and groups function from data and facets
     // getListMetadata => LineComponent , ListComponent and maybe other informations concidered usefull
     const {LineComponent, sortList, groupList} = searchMetadata.getListMetadata( element.contentType, element.values)
     return {
       ...element,
       LineComponent,
       sortList,
       groupList
     }
  })
  return results;
}

export function getResultsForList(list, searchMetadata, contentType){
  const {LineComponent, sortList, groupList} = searchMetadata.getListMetadata( list.contentType, list.values)
  return {
   values: list.values,
   groupList,
   sortList,
   LineComponent
 }

}

export function connect(searchOptions) {
  const {unitSearch: {updateSort, updateGroup, updateSelectedFacets, updateQuery}} = searchOptions;
  return function getSearchConnectedComponent(ComponentToConnect){
    function SearchConnectedComponent(props, context){
      const {searchMetadata} = context;
      const {dispatch, results: {hasGroups, data, contentType, totalCount}} = props;
      const unitSearchDispatch = {
        sort: element => dispatch(updateSort(element)),
        group: element => dispatch(updateGroup(element)),
        facet: (element, replace) => dispatch(updateSelectedFacets(element, replace)),
        query: element => dispatch(updateQuery(element))
      }
      const results = hasGroups ? getResultsForGroup(data, searchMetadata) : getResultsForList(data, searchMetadata, contentType);
      const facetInformations = facetListWithselectedInformation(props)
      results.totalCount = totalCount;
      return <ComponentToConnect
                isGroup={hasGroups}
                valuesForResults={results}
                selectedFacetsList={facetInformations.selectedFacetsList}
                facetListWithselectedInformation={facetInformations.facetListWithselectedInformation}
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

// Usage and example
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
    searchMetadata: PropTypes.object.isRequired // Add a shape
};




export const Provider = SearchProvider;
