import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import connectToSelectableList from './selectable-list'
import FacetPanel from './facet';
import ToolBar from './toolbar';
import ActionQuery from './searchbar';
import {ResultList, ResultGroup, ListComponent} from './results';

// <ActionQuery data-focus='action-query-advanced-search' group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>

const AdvancedSearch = ({valuesForResults, unitSearchDispatch, facetListWithselectedInformation, isGroup, isSelectable, ListComponent}) =>  {
  console.log('je me rends')
  const toolbarProps = {
    group: unitSearchDispatch.group,
    sortList: valuesForResults.sortList,
    groupList : valuesForResults.groupList,
    sort: unitSearchDispatch.sort,
    isGroup: isGroup
  }
  return <div style={{color: 'orange'}} data-focus='advanced-search'>
    {isGroup ?
      <ResultGroup isGroup={isGroup}
            data-focus='result-group-advanced-search'
            data={valuesForResults}
            toolbarProps={toolbarProps}
            /> :
      <ResultList sort={unitSearchDispatch.sort}
            data-focus='result-list-advanced-search'
            toolbarProps={toolbarProps}
            data={valuesForResults.values}
            ListComponent={ListComponent}
            LineComponent={valuesForResults.LineComponent}
            />
    }
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
