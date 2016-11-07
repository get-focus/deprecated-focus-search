import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import connectToSelectableList from './selectable-list'
import {FacetPanel} from './facet';
import ToolBar from './toolbar';
import {InformationBar} from './informationbar';
import {ResultList, ResultGroup, ListComponentWithToolBar} from './results';

// <ActionQuery data-focus='action-query-advanced-search' group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>

export class AdvancedSearch extends Component{
  componentWillMount(){
    const {start} = this.props;
    start();
  }
  render () {
    //const {valuesForResults, groupSelect,selectedFacetsList, unitSearchDispatch, facetListWithselectedInformation, isGroup, isSelectable, scope, ListComponent} = this.props;
    const {isGroup,InformationBarProps,ResultGroupProps, ResultListProps, FacetPanelProps, i18n, ListComponent,GlobalActions, hasScope }= this.props;

    return (
        <div data-focus='advanced-search'>
            <div data-focus="results-advanced-search">
                <InformationBar
                    {...InformationBarProps}
                    data-focus='information-bar-advanced-search' />
                {isGroup ?
                  <ResultGroup isGroup={isGroup}
                      ListComponent={ListComponent}
                      GlobalActions={GlobalActions}
                      hasScope={hasScope}
                      data-focus='result-group-advanced-search'
                      {...ResultGroupProps}
                      />
                    :
                    <ResultList
                        data-focus='result-list-advanced-search'
                        ListComponentWithToolBar={ListComponent}
                        isGroup={isGroup}
                        GlobalActions={GlobalActions}
                        {...ResultListProps}
                        />
                }
            </div>
            <FacetPanel
                data-focus="facet-panel-advanced-search"
                title='Facets'
                {...FacetPanelProps}/>
        </div>
    )
  }

}

AdvancedSearch.displayName = 'Advanced Search'
AdvancedSearch.propTypes ={
    isSelectable: PropTypes.bool,
    isGroup: PropTypes.bool,
    valuesForResults: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    i18n: PropTypes.func,
    unitSearchDispatch: PropTypes.object.isRequired,
    facetListWithselectedInformation: PropTypes.array.isRequired
};
AdvancedSearch.defaultProps = {
    isSelectable:  true,
    isGroup: false,
    i18n: elm => elm,
    unitSearchDispatch: {
    },
    valuesForResults: {
      values: []
    },
    facetListWithselectedInformation: [],
    ListComponent: connectToSelectableList(ListComponentWithToolBar)
};
