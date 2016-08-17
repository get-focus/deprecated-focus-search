import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import connectToSelectableList from './selectable-list'
import FacetPanel from './facet';
import ToolBar from './toolbar';
import ActionQuery from './searchbar';
import {ResultList, ResultGroup} from './results';

// function ListComponent({toggleLineSelection, LineComponent, lineIdentifierProperty, data,children, ...otherProps}){
//     return <ul>
//     {data.map( ({isSeleted, ...lineDescriptor}) => <LineComponent isSelected={isSeleted} toggleLineSelection={toggleLineSelection} key={lineDescriptor[lineIdentifierProperty]} {...lineDescriptor} />)}
//     </ul>
//   }


const AdvancedSearch = ({valuesForResults, unitSearchDispatch, facetListWithselectedInformation, isGroup, isSelectable}) =>  {
  return <div style={{color: 'orange'}} data-focus='advanced-search'>
    <ActionQuery data-focus='action-query-advanced-search' group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>
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
            isSelectable={isSelectable}
            sortList={valuesForResults.sortList}
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
  facetListWithselectedInformation: []
}

export default AdvancedSearch;
