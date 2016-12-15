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

AdvancedSearch.displayName = 'AdvancedSearch';
AdvancedSearch.propTypes = {
    customLineProps: PropTypes.object,
    FacetPanelProps: PropTypes.object,
    InformationBarProps: PropTypes.object,
    isGroup: PropTypes.bool,
    ListComponent: PropTypes.func,
    ResultGroupProps: PropTypes.object,
    ResultListProps: PropTypes.object,
    triggerStart: PropTypes.bool
};
AdvancedSearch.defaultProps = {
    isGroup: false,
    ListComponent: connectToSelectableList(ListComponentWithToolBar),
    triggerStart: true
};
