import {capitalize, toUpper} from 'lodash/string';
export const UPDATE_FACETS = 'SEARCH_UPDATE_FACETS';
export const UPDATE_SCOPE = 'SEARCH_UPDATE_SCOPE';
export const UPDATE_SELECTED_FACETS = 'SEARCH_UPDATE_SELECTED_FACETS';
export const UPDATE_QUERY = 'SEARCH_UPDATE_QUERY';





export const unitSearchActionBuilder = name => {
	const UPDATE_QUERY_SEARCH =  toUpper(name)+"_UPDATE_QUERY";
	const UPDATE_FACETS_SEARCH =  toUpper(name)+"_UPDATE_FACETS";
	const UPDATE_SCOPE_SEARCH =  toUpper(name)+"_UPDATE_SCOPE";
	const UPDATE_SELECTED_FACETS_SEARCH =  toUpper(name)+"_UPDATE_SELECTED_FACETS";

	return {
		updateQuery : updateQuery(UPDATE_QUERY_SEARCH),
		updateScope: updateScope(UPDATE_SCOPE_SEARCH),
		updateFacets: updateFacets(UPDATE_FACETS_SEARCH), 
		updateSelectedFacets: updateSelectedFacets(UPDATE_SELECTED_FACETS_SEARCH)
	}
}
/**
 * Actions comments
 * @param  {query} search query
 * @return {object} the action itself
 */

export const updateQuery = type => query => ({
	type: type,
	query
});


/**
 * Actions comments
 * @param  {scope} search query
 * @return {object} the action itself
 */
export const updateScope = type => scope => ({
	type: type,
	scope
});

/**
 * Actions comments
 * @param  {selectedFacets} search selectedFacets
 * @return {object} the action itself
 */
export const updateSelectedFacets = type => selectedFacets => ({
	type: type,
	selectedFacets
});

/**
 * Actions comments
 * @param  {facets} search facets
 * @return {object} the action itself
 */
export const updateFacets = type => facets => ({
	type: type,
	facets
});
