import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import connectToSelectableList from './selectable-list'
import FacetPanel from './facet';
import ToolBar from './toolbar';
import ActionQuery from './searchbar';
import {InformationBar} from './informationbar';
import {ResultList, ResultGroup, ListComponent} from './results';

// <ActionQuery data-focus='action-query-advanced-search' group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>

const AdvancedSearch = ({valuesForResults, selectedFacetsList, unitSearchDispatch, facetListWithselectedInformation, isGroup, isSelectable, ListComponent}) =>  {
  const toolbarProps = {
    group: unitSearchDispatch.group,
    sortList: valuesForResults.sortList,
    groupList : valuesForResults.groupList,
    sort: unitSearchDispatch.sort,
    isGroup: isGroup
  }
  return <div data-focus='advanced-search'>
    <div data-focus="results-advanced-search">
      <InformationBar selectedFacetsList={selectedFacetsList}
              facet={facetListWithselectedInformation}
              totalCount={valuesForResults.totalCount}
              deleteFacet={value => unitSearchDispatch.facet(value, true)}
              data-focus='information-bar-advanced-search'/>
      {isGroup ?
        <ResultGroup isGroup={isGroup}
              data-focus='result-group-advanced-search'
              data={valuesForResults}
              toolbarProps={toolbarProps}
              /> :
        <ResultList data={valuesForResults.values}
              data-focus='result-list-advanced-search'
              ListComponent={ListComponent}
              LineComponent={valuesForResults.LineComponent}
              toolbarProps={toolbarProps}
              />
      }
    </div>

    <FacetPanel data={facetListWithselectedInformation}
            data-focus="facet-panel-advanced-search"
            facet={unitSearchDispatch.facet}
            title='My awesome facets'/>
  </div>;
}

AdvancedSearch.displayName= 'Advanced Search'
AdvancedSearch.propTypes ={
  isSelectable: PropTypes.bool,
  isGroup: PropTypes.bool,
  valuesForResults: PropTypes.object.isRequired,
  unitSearchDispatch: PropTypes.object.isRequired,
  facetListWithselectedInformation: PropTypes.array.isRequired
}
AdvancedSearch.defaultProps = {
  isSelectable:  true,
  isGroup: false,
  unitSearchDispatch: {},
  valuesForResults: {},
  facetListWithselectedInformation: [],
  ListComponent: connectToSelectableList(ListComponent)
}

export default AdvancedSearch;
