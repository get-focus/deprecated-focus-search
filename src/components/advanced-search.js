import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import connectToSelectableList from './selectable-list'
import FacetPanel from './facet';
import ToolBar from './toolbar';
import SearchBar from './search-bar';
import {ResultList, ResultGroup} from './results';

// function ListComponent({toggleLineSelection, LineComponent, lineIdentifierProperty, data,children, ...otherProps}){
//     return <ul>
//     {data.map( ({isSeleted, ...lineDescriptor}) => <LineComponent isSelected={isSeleted} toggleLineSelection={toggleLineSelection} key={lineDescriptor[lineIdentifierProperty]} {...lineDescriptor} />)}
//     </ul>
//   }

const AdvancedSearch = ({valuesForResults, unitSearchDispatch, facetListWithselectedInformation, isGroup, isSelectable}) => (
    <div data-focus='advanced-search'>
        <FacetPanel data={facetListWithselectedInformation}
                    facet={unitSearchDispatch.facet}
                    title='My awesome facets'/>
        {isGroup ?
            <ResultGroup isGroup={isGroup}
                        data={valuesForResults}
                        sort={unitSearchDispatch.sort}
                        group={unitSearchDispatch.group}
                        />
                :
            <ResultList sort={unitSearchDispatch.sort}
                        group={unitSearchDispatch.group}
                        data={valuesForResults.values}
                        isSelectable={isSelectable}
                        sortList={valuesForResults.sortList}
                        groupList={valuesForResults.groupList}
                        LineComponent={valuesForResults.LineComponent}
            />
        }
    </div>
);

AdvancedSearch.displayName= 'Advanced Search';
AdvancedSearch.propTypes ={
    isSelectable: PropTypes.bool,
    isGroup: PropTypes.bool,
    valuesForResults: PropTypes.object.isRequired,
    unitSearchDispatch: PropTypes.object.isRequired,
    facetListWithselectedInformation: PropTypes.array.isRequired
}
AdvancedSearch.defaultProps = {
    isSelectable: false,
    isGroup: false,
    unitSearchDispatch: {},
    valuesForResults: {},
    facetListWithselectedInformation: []
}
export default AdvancedSearch;
