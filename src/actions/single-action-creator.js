import {capitalize, toUpper} from 'lodash/string';
import {isArray, isFunction,isString} from 'lodash/lang';

const STRING_EMPTY = '';
const UNIT_ACTION_BUILDER = 'UNIT_ACTION_SEARCH_BUILDER';



const _validateUnitActionBuilderParams = (name) => {
    if(!isString(name) || STRING_EMPTY === name) {
        throw new Error(`${UNIT_ACTION_BUILDER}: the name parameter should be a string`);
    }
}


export const singleActionCreatorBuilder = name => {
    _validateUnitActionBuilderParams(name);
    const NEXT_PAGE_SEARCH = `${toUpper(name)}_NEXT_PAGE`;
    const INIT_PAGE_SEARCH = `${toUpper(name)}_INIT_PAGE`;
    const UPDATE_QUERY_SEARCH = `${toUpper(name)}_UPDATE_QUERY`;
    const UPDATE_SORT_SEARCH = `${toUpper(name)}_UPDATE_SORT`;
    const UPDATE_GROUP_SEARCH = `${toUpper(name)}_UPDATE_GROUP`;
    const UPDATE_SELECTED_FACETS_SEARCH = `${toUpper(name)}_UPDATE_SELECTED_FACETS`;
    const START_SEARCH = `${toUpper(name)}_START_SEARCH`;

    return {
        creators: {
            nextPage: nextPage(NEXT_PAGE_SEARCH),
            initPage: initPage(INIT_PAGE_SEARCH),
            updateQuery : updateQuery(UPDATE_QUERY_SEARCH),
            updateSort : updateSort(UPDATE_SORT_SEARCH),
            updateGroup : updateGroup(UPDATE_GROUP_SEARCH),
            updateSelectedFacets: updateSelectedFacets(UPDATE_SELECTED_FACETS_SEARCH),
            startSearch: startSearch(START_SEARCH)
        },
        types: {
            [NEXT_PAGE_SEARCH]: NEXT_PAGE_SEARCH,
            [INIT_PAGE_SEARCH] : INIT_PAGE_SEARCH,
            [UPDATE_QUERY_SEARCH]: UPDATE_QUERY_SEARCH,
            [UPDATE_SORT_SEARCH]: UPDATE_SORT_SEARCH,
            [UPDATE_GROUP_SEARCH]: UPDATE_GROUP_SEARCH,
            [UPDATE_SELECTED_FACETS_SEARCH]: UPDATE_SELECTED_FACETS_SEARCH,
            [START_SEARCH]: START_SEARCH
        }
    }
}

/**
* Actions comments
* @param  {query} search query
* @return {object} the action itself
*/

const nextPage = type => (top = 0, skip = 0, isSearchAction = true) => ({
    type,
    top,
    skip,
    isSearchAction
});

const initPage = type => () => ({
  type
})

const updateQuery = type => (query, replace = false, isSearchAction = true) => ({
    type,
    query,
    replace,
    isSearchAction
});


const updateSort = type => (sort, replace = false, isSearchAction = true) => ({
    type,
    sort,
    replace,
    isSearchAction
});

const updateGroup = type => (group, replace = false, isSearchAction = true) => ({
    type,
    group,
    replace,
    isSearchAction
});

/**
* Actions comments
* @param  {selectedFacets} search selectedFacets
* @return {object} the action itself
*/
const updateSelectedFacets = type => (selectedFacets, replace = false, isSearchAction = true) => ({
    type,
    selectedFacets,
    replace,
    isSearchAction
});


const startSearch = type => () => ({
    type,
    isSearchAction: true
})
/*

// High order action creator => not really readable ...
cont hb = (type, property) => {
(propertyValue, replace) => ({
[property]: propertyValue,
replace,
type
})
}

hb(UPDATE_QUERY_SEARCH, 'selectedFacets')
*/
