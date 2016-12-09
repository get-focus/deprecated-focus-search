import React, {PropTypes, PureComponent} from 'react';
import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';

import {selectSearch} from '../reducer'
import connectToSelectableList from './selectable-list'
import {FacetPanel} from './facet';
import {InformationBar} from './informationbar';
import {ResultList, ResultGroup, ListComponentWithToolBar} from './results';

// <ActionQuery data-focus='action-query-advanced-search' group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>

export class AdvancedSearch extends PureComponent {
    componentWillMount(){
        const {start} = this.props;
        start();
    };
    render() {
        //const {valuesForResults, groupSelect,selectedFacetsList, unitSearchDispatch, facetListWithselectedInformation, isGroup, isSelectable, scope, ListComponent} = this.props;
        const {
            customLineProps,
            FacetPanelProps,
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
                            {...ResultGroupProps} />
                        :
                        <ResultList
                            customLineProps={customLineProps}
                            data-focus='result-list-advanced-search'
                            ListComponent={ListComponent}
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
    unitSearchDispatch: PropTypes.object.isRequired,
    facetListWithselectedInformation: PropTypes.array.isRequired
};
AdvancedSearch.defaultProps = {
    isSelectable:  true,
    isGroup: false,
    unitSearchDispatch: {},
    valuesForResults: {
        values: []
    },
    facetListWithselectedInformation: [],
    ListComponent: connectToSelectableList(ListComponentWithToolBar)
};
