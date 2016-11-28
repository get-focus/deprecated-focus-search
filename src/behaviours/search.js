import React, {Component, PropTypes} from 'react';
import {connect as connectToState} from 'react-redux';
import {compose} from 'redux';
import {map} from 'lodash/map';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import {loadLine} from '../actions/single-action-creator';
import {get} from 'lodash';

const SEARCH_CONTEXT_TYPE = {
    searchMetadata: PropTypes.object
};

// Maybe this function should take the facets and the selectedFacets only.
export function facetListWithselectedInformation(state) {
    const selectedFacets = state.criteria.selectedFacets || [];
    const facets = state.results.facets || [];
    // TODO: Check the selected value presence
    return {
        facetListWithselectedInformation : facets.map(facetDescriptor => (selectedFacets[facetDescriptor.code]) ?
        {...facetDescriptor,selectedFacets: selectedFacets[facetDescriptor.code], selected: true} : facetDescriptor) ,
        selectedFacetsList :  selectedFacets
    }
}

export function getResultsForGroup(groups, searchMetadata){
    return groups.map(element => {
        // TODO: searchMetadataProvider => getListMetadata in data, and get sorts and groups function from data and facets
        // getListMetadata => LineComponent , ListComponent and maybe other informations concidered usefull
        const {scopeEntityDefintion} = searchMetadata;
        //TO Do scopeEntityDefintion existing
        const {ActionsComponent, actionsLine, LineComponent, sortList, groupList, lineIdentifierProperty, GlobalGroupActionsComponent} = searchMetadata.getListMetadata(element.listType, element.values)
        const formators = (scopeEntityDefintion && scopeEntityDefintion[element.listType]) ? scopeEntityDefintion[element.listType] : props => props
        return {
            ...element,
            code: element.code,
            label : element.label,
            listType: element.listType,
            lineIdentifierProperty: lineIdentifierProperty,
            values: element.list,
            LineComponent,
            ActionsComponent,
            actionsLine,
            sortList,
            GlobalGroupActionsComponent,
            groupList
        };
    });
};

export function getResultsForList(list = [], searchMetadata, listType){
    const {ActionsComponent, actionsLine, LineComponent, sortList, groupList, lineIdentifierProperty, GlobalGroupActionsComponent} = searchMetadata.getListMetadata(listType, list)
    return {
        ActionsComponent,
        actionsLine,
        LineComponent,
        lineIdentifierProperty,
        listType,
        GlobalGroupActionsComponent,
        groupList,
        sortList,
        values: list
    };
};

export function connect(searchOptions) {
    const {unitSearch: {updateSort, updateGroup, updateSelectedFacets, updateQuery, startSearch}} = searchOptions;

    return function getSearchConnectedComponent(ComponentToConnect) {

        function SearchConnectedComponent(props, context) {
            const {searchMetadata} = context;
            const {customLineProps, dispatch, results: {hasGroups, data, listType, totalCount}, criteria} = props;
            const groupSelect = get(criteria, 'group');
            const scope = get(criteria, 'query.scope', searchMetadata.scopes.find(scope => scope.selected === true).value) || 'ALL';
            const hasScope = isUndefined(get(criteria, 'query.scope'));
            const unitSearchDispatch = {
                startAction: element => dispatch(startSearch()),
                sortAction: element => dispatch(updateSort(element)),
                groupAction: (element, replace) => dispatch(updateGroup(element, replace)),
                facetAction: function facet(element, replace) {
                    if(element.code === 'FCT_SCOPE') {
                        dispatch(updateQuery({scope: element.values}, false, false));
                        dispatch(updateGroup({}, true, false));
                        dispatch(updateSelectedFacets(null, true));
                        return;
                    }
                    return dispatch(updateSelectedFacets(element, replace));
                },
                queryAction: element => dispatch(updateQuery(element)),
                scopeAction: (element, replace) => {
                    dispatch(updateQuery(element.query.value, element.query.replace, false));
                    dispatch(updateGroup(element.group.value, element.group.replace, false));
                    dispatch(updateSelectedFacets(null, true))
                }
            };
            const results = hasGroups ? getResultsForGroup(data, searchMetadata) : getResultsForList(data, searchMetadata, listType);
            const facetInformations = facetListWithselectedInformation(props);
            results.totalCount = totalCount;
            results.groupSelect = groupSelect;

            const InformationBarProps = {
                selectedFacetsList: facetInformations.selectedFacetsList,
                facets: facetInformations.facetListWithselectedInformation,
                scopeList: scope,
                totalCount: totalCount,
                unitSearchDispatch: unitSearchDispatch,
                deleteFacet: value => unitSearchDispatch.facetAction(value, true)
            }

            const ResultGroup = {
                scope: scope,
                valuesForResults: results,
                unitSearchDispatch: unitSearchDispatch
            }

            const ResultList = {
                valuesForResult: results,
                unitSearchDispatch: unitSearchDispatch
            }

            const FacetPanel = {
                data: facetInformations.facetListWithselectedInformation,
                facetAction: unitSearchDispatch.facetAction
            }

            const SearchBarProps = {
                scopeList: scope,
                unitSearchDispatch:unitSearchDispatch,
                scopes: searchMetadata.scopes
            }

            return (
                <ComponentToConnect
                    customLineProps={customLineProps}
                    isGroup={hasGroups}
                    GlobalActions={searchMetadata.GlobalActions}
                    hasScope={hasScope}
                    start={unitSearchDispatch.startAction}
                    InformationBarProps={InformationBarProps}
                    ResultGroupProps={ResultGroup}
                    ResultListProps={ResultList}
                    SearchBarProps={SearchBarProps}
                    FacetPanelProps={FacetPanel} />
            );
        };
        SearchConnectedComponent.displayName= 'SearchConnectedComponent';
        SearchConnectedComponent.contextTypes = SEARCH_CONTEXT_TYPE;
        SearchConnectedComponent.PropTypes = {
            results : PropTypes.shape({
                data: PropTypes.object,
                listType: PropTypes.string
            }).isRequired,
        };
        return compose (
            connectToState(s=> s[searchOptions.searchName])
        )(SearchConnectedComponent);
    };
};

// Usage and example
class SearchProvider extends Component {
    getChildContext() {
        return {
            searchMetadata : this.props.searchMetadata
        };
    };
    render() {
        return this.props.children;
    };
};
SearchProvider.childContextTypes = SEARCH_CONTEXT_TYPE;
SearchProvider.propTypes = {
    searchMetadata: PropTypes.object.isRequired // Add a shape
};
export const Provider = SearchProvider;
