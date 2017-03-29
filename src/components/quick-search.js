import React, {PropTypes, PureComponent} from 'react';
import connectToSelectableList from './selectable-list'
import {FacetPanel} from './facet';
import SearchBar from './searchbar'
import {InformationBar} from './informationbar';
import {ResultList, ResultGroup, ListQuickSearch} from './results';
import paginateConnector from '../behaviours/paginate';

export class QuickSearch extends PureComponent {
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
            SearchBarProps,
            ResultGroupProps,
            ResultListProps
        } = this.props;
        const {unitSearchDispatch, ...rest} = SearchBarProps;
        return (
            <div data-focus='quick-search'>
                <div data-focus="search-bar-quick-search"><SearchBar {...unitSearchDispatch} {...rest}/></div>
                <div data-focus="results-advanced-search">
                    {isGroup ?
                        <ResultGroup
                            customLineProps={customLineProps}
                            data-focus='result-group-advanced-search'
                            ListComponent={paginateConnector()(ListComponent)}
                            {...ResultGroupProps}
                            isQuickSearch={true}
                           />
                        :
                        <ResultList
                            isToolBar={false}
                            customLineProps={customLineProps}
                            data-focus='result-list-advanced-search'
                            ListComponent={paginateConnector()(ListComponent)}
                            {...ResultListProps} />
                    }
                </div>
            </div>
        );
    };
};

QuickSearch.displayName = 'QuickSearch';
QuickSearch.propTypes = {
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
QuickSearch.defaultProps = {
    isGroup: false,
    ListComponent: ListQuickSearch,
    paginateConnector: props => (Component => Component),
    paginateProps: {
        top: 5,
        skip: 0
    },
    triggerStart: true
};
