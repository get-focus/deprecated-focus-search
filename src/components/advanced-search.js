import React, {Component, PropTypes} from 'react';
import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';

import {selectSearch} from '../reducer'
import connectToSelectableList from './selectable-list'
import {FacetPanel} from './facet';
import {InformationBar} from './informationbar';
import {ResultList, ResultGroup, ListComponentWithToolBar} from './results';

// <ActionQuery data-focus='action-query-advanced-search' group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>

export class AdvancedSearch extends Component {
    componentWillMount(){
        const {start} = this.props;
        start();
    };
    render() {
        //const {valuesForResults, groupSelect,selectedFacetsList, unitSearchDispatch, facetListWithselectedInformation, isGroup, isSelectable, scope, ListComponent} = this.props;
        const {
            customLineProps,
            FacetPanelProps,
            GlobalActions,
            hasScope,
            i18n,
            InformationBarProps,
            isGroup,
            ListComponent,
            ResultGroupProps,
            ResultListProps
        } = this.props;
        return (
            <div data-focus='advanced-search'>
                <div data-focus="results-advanced-search">
                    <InformationBar {...InformationBarProps} data-focus='information-bar-advanced-search' />
                    {isGroup ?
                        <ResultGroup
                            customLineProps={customLineProps}
                            data-focus='result-group-advanced-search'
                            ListComponent={ListComponent}
                            isGroup={isGroup}
                            GlobalActions={GlobalActions}
                            hasScope={hasScope}
                            {...ResultGroupProps} />
                        :
                        <ResultList
                            customLineProps={customLineProps}
                            data-focus='result-list-advanced-search'
                            ListComponentWithToolBar={ListComponent}
                            isGroup={isGroup}
                            GlobalActions={GlobalActions}
                            {...ResultListProps} />
                    }
                </div>
                <FacetPanel
                    data-focus="facet-panel-advanced-search"
                    title='Facets'
                    {...FacetPanelProps} />
            </div>
        );
    };
};

AdvancedSearch.displayName = 'Advanced Search';
AdvancedSearch.propTypes = {
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
    unitSearchDispatch: {},
    valuesForResults: {
        values: []
    },
    facetListWithselectedInformation: [],
    ListComponent: connectToSelectableList(ListComponentWithToolBar)
};
