import React, {PropTypes, PureComponent} from 'react';
import connectToSelectableList from './selectable-list'
import {FacetPanel} from './facet';
import {InformationBar} from './informationbar';
import {ResultList, ResultGroup, ListComponentWithToolBar} from './results';


export class AdvancedSearch extends PureComponent {
    componentWillMount(){
        const {start, triggerStart} = this.props;
        if(triggerStart) start();
    };
    render() {
        const {
            customLineProps,
            FacetPanelProps,
            InformationBarProps,
            isGroup,
            ListComponent,
            paginateConnector,
            paginateProps,
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
                            ListComponent={paginateConnector(paginateProps)(ListComponent)}
                            {...ResultGroupProps} />
                        :
                        <ResultList
                            customLineProps={customLineProps}
                            data-focus='result-list-advanced-search'
                            ListComponent={paginateConnector(paginateProps)(ListComponent)}
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

AdvancedSearch.displayName = 'AdvancedSearch';
AdvancedSearch.propTypes = {
    customLineProps: PropTypes.object,
    FacetPanelProps: PropTypes.object,
    InformationBarProps: PropTypes.object,
    isGroup: PropTypes.bool,
    ListComponent: PropTypes.func,
    paginateConnector: PropTypes.func,
    paginateProps: PropTypes.object,
    ResultGroupProps: PropTypes.object,
    ResultListProps: PropTypes.object,
    triggerStart: PropTypes.bool
};
AdvancedSearch.defaultProps = {
    isGroup: false,
    ListComponent: connectToSelectableList(ListComponentWithToolBar),
    paginateConnector: props => (Component => Component),
    paginateProps: {
        top: 20,
        skip: 0
    },
    triggerStart: true
};
