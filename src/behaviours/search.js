import React, {PropTypes, PureComponent} from 'react';
import {connect as connectToState} from 'react-redux';
import {compose} from 'redux';
import {map} from 'lodash/map';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import {loadLine} from '../actions/single-action-creator';
import {get, set} from 'lodash';

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

        class SearchConnectedComponent extends PureComponent {
            constructor(props){
                super(props);
                const {dispatch} = this.props;
                this.unitSearchDispatch = {
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
                        dispatch(updateSort({}));
                        dispatch(updateGroup(element.group.value, element.group.replace, false));
                        dispatch(updateSelectedFacets(null, true))
                    }
                };
            }
            render() {
                const {searchMetadata} = this.context;
                const {GlobalActions, scopes} = searchMetadata;
                const {customLineProps, results: {hasGroups, data, listType, totalCount}, criteria} = this.props;

                const hasDefinedScopes = scopes !== undefined && scopes.length > 0;
                const criteriaScope = get(criteria, 'query.scope', scopes.find(scope => scope.selected === true).value);
                const scope = criteriaScope || 'all';
                const hasScope = !isUndefined(get(criteria, 'query.scope'));
                const groupSelect = get(criteria, 'group');
                const term = get(criteria, 'query.term');
                const results = hasGroups ? getResultsForGroup(data, searchMetadata) : getResultsForList(data, searchMetadata, listType);
                const facetInformations = facetListWithselectedInformation(this.props);
                set(results, 'totalCount', totalCount);
                set(results, 'groupSelect', groupSelect);

                const InformationBarProps = {
                    deleteFacet: value => this.unitSearchDispatch.facetAction(value, true),
                    facets: facetInformations.facetListWithselectedInformation,
                    scope,
                    selectedFacetsList: facetInformations.selectedFacetsList,
                    term,
                    totalCount: totalCount,
                    unitSearchDispatch: this.unitSearchDispatch
                }

                const ResultGroup = {
                    isAllScopeResults: hasDefinedScopes && !hasScope,
                    isGroup: hasGroups,
                    unitSearchDispatch: this.unitSearchDispatch,
                    valuesForResults: results
                }

                const ResultList = {
                    isGroup: hasGroups,
                    unitSearchDispatch: this.unitSearchDispatch,
                    valuesForResult: results
                }

                const FacetPanel = {
                    data: facetInformations.facetListWithselectedInformation,
                    facetAction: this.unitSearchDispatch.facetAction
                }

                const SearchBarProps = {
                    scope,
                    scopes: scopes,
                    term,
                    unitSearchDispatch: this.unitSearchDispatch
                }

                return (
                    <ComponentToConnect
                        customLineProps={customLineProps}
                        FacetPanelProps={FacetPanel}
                        GlobalActions={GlobalActions}
                        InformationBarProps={InformationBarProps}
                        isGroup={hasGroups}
                        ResultGroupProps={ResultGroup}
                        ResultListProps={ResultList}
                        SearchBarProps={SearchBarProps}
                        start={this.unitSearchDispatch.startAction} />
                );
            };
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
class SearchProvider extends PureComponent {
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
