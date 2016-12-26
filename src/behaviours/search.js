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

// extract exact metadatas
function extractMedatadas(metadatas) {
    const { ActionsComponent, actionsLine, LineComponent, sortList, groupList, lineIdentifierProperty, GlobalGroupActionsComponent } = metadatas;
    return { ActionsComponent, actionsLine, LineComponent, sortList, groupList, lineIdentifierProperty, GlobalGroupActionsComponent };
}

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
        const metadatas = extractMedatadas(searchMetadata.getListMetadata(element.listType, element.values));
        return {
            ...element,
            ...metadatas,
            code: element.code,
            data: element.list,
            label : element.label,
            listType: element.listType
        };
    });
};

export function getResultsForList(list = [], searchMetadata, listType) {
    const metadatas = extractMedatadas(searchMetadata.getListMetadata(listType, list));
    return {
        ...metadatas,
        data: list,
        listType
    };
};

export function connect(searchOptions) {
    const {unitSearch: {nextPage, updateSort, updateGroup, updateSelectedFacets, updateQuery, startSearch, initPage}} = searchOptions;

    return function getSearchConnectedComponent(ComponentToConnect) {

        class SearchConnectedComponent extends PureComponent {
            constructor(props){
                super(props);
                const {dispatch} = this.props;
                this.unitSearchDispatch = {
                    nextPage: (top, skip) => dispatch(nextPage(top, skip)),
                    startAction: element => {
                      dispatch(initPage())
                      dispatch(startSearch())
                    },
                    sortAction: element => {
                       dispatch(initPage())
                       dispatch(updateSort(element))
                    },
                    groupAction: (element, replace) => {
                      dispatch(initPage())
                      dispatch(updateGroup(element, replace))
                    },
                    facetAction: function facet(element, replace) {
                        if(element.code === 'FCT_SCOPE') {
                            dispatch(initPage())

                            dispatch(updateQuery({scope: element.values}, false, false));
                            dispatch(updateGroup({}, true, false));
                            dispatch(updateSelectedFacets(null, true));
                            return;
                        }
                        dispatch(initPage())
                        dispatch(updateGroup({}, true, false));
                        return dispatch(updateSelectedFacets(element, replace, true));
                    },
                    queryAction: element => {
                       dispatch(updateQuery(element))
                       dispatch(initPage())
                    },
                    scopeAction: (element, replace) => {
                        dispatch(initPage())
                        dispatch(updateQuery(element.query.value, element.query.replace, false));
                        dispatch(updateSort({}));
                        dispatch(updateGroup(element.group.value, element.group.replace, false));
                        dispatch(updateSelectedFacets(null, true))
                    }
                };
            }
            render() {
                const {searchMetadata} = this.context;
                const {scopes} = searchMetadata;
                const {customLineProps, results: {hasGroups, data, listType, totalCount}, criteria, ...otherProps} = this.props;

                const hasDefinedScopes = scopes !== undefined && scopes.length > 0;
                const criteriaScope = hasDefinedScopes ? get(criteria, 'query.scope', scopes.find(scope => scope.selected === true).value) : undefined;
                const scope = hasDefinedScopes ? criteriaScope || 'all' : undefined;
                const hasScope = hasDefinedScopes ? !isUndefined(get(criteria, 'query.scope')) : false;
                const groupSelect = get(criteria, 'group');
                const term = get(criteria, 'query.term');
                const results = hasGroups ? getResultsForGroup(data, searchMetadata) : getResultsForList(data, searchMetadata, listType);
                const facetInformations = facetListWithselectedInformation(this.props);

                set(results, 'totalCount', totalCount);
                set(results, 'groupSelect', groupSelect);

                const paginateProps = {
                  onClickNext: this.unitSearchDispatch.nextPage,
                  page: criteria.page,
                  skip: criteria.skip,
                  top: criteria.top,
                  isOtherAction: hasGroups,
                  otherAction:({groupSelected = {name:'FCT_SCOPE'}, valuesForResult: {code}}) => this.unitSearchDispatch.facetAction({code: groupSelected.name, values: code})
                };


                const InformationBarProps = {
                    deleteFacet: value => this.unitSearchDispatch.facetAction(value, true),
                    facets: facetInformations.facetListWithselectedInformation,
                    hasDefinedScopes,
                    scope,
                    selectedFacetsList: facetInformations.selectedFacetsList,
                    term,
                    totalCount: totalCount,
                    unitSearchDispatch: this.unitSearchDispatch
                }

                const ResultGroup = {
                    isAllScopeResults: hasDefinedScopes && !hasScope,
                    isGroup: hasGroups,
                    scope,
                    groupSelected: groupSelect,
                    paginateProps,
                    unitSearchDispatch: this.unitSearchDispatch,
                    valuesForResults: results
                }

                const ResultList = {
                    isGroup: hasGroups,
                    scope,
                    paginateProps,
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
                        {...otherProps}
                        customLineProps={customLineProps}
                        FacetPanelProps={FacetPanel}
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
