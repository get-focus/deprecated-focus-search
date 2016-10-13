import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import connectToSelectableList from './selectable-list'
import {FacetPanel} from './facet';
import ToolBar from './toolbar';
import {InformationBar} from './informationbar';
import {ResultList, ResultGroup, ListComponent} from './results';

// <ActionQuery data-focus='action-query-advanced-search' group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>

export class AdvancedSearch extends Component{
  componentWillMount(){
    const {start} = this.props;
    start();
  }
  render () {
    //const {valuesForResults, groupSelect,selectedFacetsList, unitSearchDispatch, facetListWithselectedInformation, isGroup, isSelectable, scope, ListComponent} = this.props;
    const {isGroup,InformationBarProps,ResultGroupProps, ResultListProps, FacetPanelProps }= this.props;

    return (
        <div data-focus='advanced-search'>
            <div data-focus="results-advanced-search">
                <InformationBar
                    {...InformationBarProps}
                    data-focus='information-bar-advanced-search' />
                {isGroup ?
                  <ResultGroup isGroup={isGroup}
                      data-focus='result-group-advanced-search'
                      {...ResultGroupProps}
                      />
                    :
                    <ResultList
                        data-focus='result-list-advanced-search'
                        ListComponent={ListComponent}
                        isGroup={isGroup}
                        {...ResultListProps}
                        />
                }
            </div>
            <FacetPanel
                data-focus="facet-panel-advanced-search"
                {...FacetPanelProps}
                title='My awesome facets'/>
        </div>
    )
  }

}

AdvancedSearch.displayName = 'Advanced Search'
AdvancedSearch.propTypes ={
    isSelectable: PropTypes.bool,
    isGroup: PropTypes.bool,
    valuesForResults: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,

    unitSearchDispatch: PropTypes.object.isRequired,
    facetListWithselectedInformation: PropTypes.array.isRequired
};
AdvancedSearch.defaultProps = {
    isSelectable:  true,
    isGroup: false,
    unitSearchDispatch: {
    },
    valuesForResults: {
      values: []
    },
    facetListWithselectedInformation: [],
    ListComponent: connectToSelectableList(ListComponent)
};
