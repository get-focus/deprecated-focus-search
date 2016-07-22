import {capitalize, toUpper} from 'lodash/string';
import {isArray, isFunction,isString} from 'lodash/lang';

const STRING_EMPTY = '';
const UNIT_ACTION_BUILDER = 'UNIT_ACTION_SEARCH_BUILDER';



const _validateUnitActionBuilderParams = (name) => {
    if(!isString(name) || STRING_EMPTY === name) {
        throw new Error(`${UNIT_ACTION_BUILDER}: the name parameter should be a string`);
    }
}




/**
 * [unitSearchActionBuilder description]
 * @type {[type]}
 *
 */
export const unitSearchActionBuilder = name => {
	_validateUnitActionBuilderParams(name);
	const UPDATE_QUERY_SEARCH =  toUpper(name)+"_UPDATE_QUERY";
	const UPDATE_FACETS_SEARCH =  toUpper(name)+"_UPDATE_FACETS";
	const UPDATE_SCOPE_SEARCH =  toUpper(name)+"_UPDATE_SCOPE";
	const UPDATE_SELECTED_FACETS_SEARCH =  toUpper(name)+"_UPDATE_SELECTED_FACETS";
  const DELETE_SELECTED_FACETS_SEARCH = toUpper(name)+"_DELETE_SELECTED_FACETS";

	return {
		updateQuery : updateQuery(UPDATE_QUERY_SEARCH),
		updateScope: updateScope(UPDATE_SCOPE_SEARCH),
		updateFacets: updateFacets(UPDATE_FACETS_SEARCH),
		updateSelectedFacets: updateSelectedFacets(UPDATE_SELECTED_FACETS_SEARCH),
    deleteSelectedFacets: deleteSelectedFacets(DELETE_SELECTED_FACETS_SEARCH)
	}
}

/**
 * Actions comments
 * @param  {query} search query
 * @return {object} the action itself
 */

const updateQuery = type => query => ({
	type: type,
	query
});


/**
 * Actions comments
 * @param  {scope} search query
 * @return {object} the action itself
 */
const updateScope = type => scope => ({
	type: type,
	scope
});

/**
 * Actions comments
 * @param  {selectedFacets} search selectedFacets
 * @return {object} the action itself
 */
const updateSelectedFacets = type => selectedFacets => ({
	type: type,
	selectedFacets
});


/**
 * Actions comments
 * @param  {selectedFacets} search selectedFacets
 * @return {object} the action itself
 */
const deleteSelectedFacets = type => selectedFacets => ({
	type: type,
	selectedFacets
});

/**
 * Actions comments
 * @param  {facets} search facets
 * @return {object} the action itself
 */
const updateFacets = type => facets => ({
	type: type,
	facets
});
