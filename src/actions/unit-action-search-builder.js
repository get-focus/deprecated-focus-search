import {capitalize, toUpper} from 'lodash/string';
import {isArray, isFunction,isString} from 'lodash/lang';

const STRING_EMPTY = '';
const UNIT_ACTION_BUILDER = 'UNIT_ACTION_SEARCH_BUILDER';



const _validateUnitActionBuilderParams = (name) => {
    if(!isString(name) || STRING_EMPTY === name) {
        throw new Error(`${UNIT_ACTION_BUILDER}: the name parameter should be a string`);
    }
}


export const unitSearchActionBuilder = name => {
	_validateUnitActionBuilderParams(name);
	const UPDATE_QUERY_SEARCH =  `${toUpper(name)}_UPDATE_QUERY`;
  const UPDATE_SORT_SEARCH =  `${toUpper(name)}_UPDATE_SORT`;
  const UPDATE_GROUP_SEARCH =  `${toUpper(name)}_UPDATE_GROUP`;
  const UPDATE_SELECTED_FACETS_SEARCH =  `${toUpper(name)}_UPDATE_SELECTED_FACETS`;
  return {
		updateQuery : updateQuery(UPDATE_QUERY_SEARCH),
    updateSort : updateSort(UPDATE_SORT_SEARCH),
    updateGroup : updateSort(UPDATE_GROUP_SEARCH),
		updateFacets: updateFacets(UPDATE_FACETS_SEARCH),
		updateSelectedFacets: updateSelectedFacets(UPDATE_SELECTED_FACETS_SEARCH),
	}
}

/**
 * Actions comments
 * @param  {query} search query
 * @return {object} the action itself
 */

const updateQuery = type => (query, replace) => ({
	type: type,
	query,
  replace
});


const updateSort = type => (sort, replace) => ({
	type: type,
	sort,
  replace
});
const updateGroup = type => (group, replace) => ({
	type: type,
	group,
  replace
});

/**
 * Actions comments
 * @param  {selectedFacets} search selectedFacets
 * @return {object} the action itself
 */
const updateSelectedFacets = type => (selectedFacets, replace) => ({
	type: type,
	selectedFacets,
  replace
});

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
