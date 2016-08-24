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
  return <div style={{color: 'orange'}} data-focus='advanced-search'>
    {isGroup ?
      <ResultGroup isGroup={isGroup}
            data-focus='result-group-advanced-search'
            data={valuesForResults}
            sort={unitSearchDispatch.sort}
            group={unitSearchDispatch.group}
            /> :
      <ResultList sort={unitSearchDispatch.sort}
            data-focus='result-list-advanced-search'
            group={unitSearchDispatch.group}
            data={valuesForResults.values}
            sortList={valuesForResults.sortList}
            ListComponent={ListComponent}
            groupList={valuesForResults.groupList}
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
