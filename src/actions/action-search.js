export const UPDATE_FACETS = 'SEARCH_UPDATE_FACETS';
export const UPDATE_SCOPE = 'SEARCH_UPDATE_SCOPE';
export const UPDATE_SELECTED_FACETS = 'SEARCH_UPDATE_SELECTED_FACETS';
export const UPDATE_QUERY = 'SEARCH_UPDATE_QUERY';

/**
 * Actions comments
 * @param  {query} search query
 * @return {object} the action itself
 */
export const updateQuery = (query) => ({
	type: UPDATE_QUERY,
	query
});


/**
 * Actions comments
 * @param  {scope} search query
 * @return {object} the action itself
 */
export const updateScope = (scope) => ({
	type: UPDATE_SCOPE,
	scope
});

/**
 * Actions comments
 * @param  {selectedFacets} search selectedFacets
 * @return {object} the action itself
 */
export const updateSelectedFacets = (selectedFacets) => ({
	type: UPDATE_SELECTED_FACETS,
	selectedFacets
});

/**
 * Actions comments
 * @param  {facets} search facets
 * @return {object} the action itself
 */
export const updateFacets = (facets) => ({
	type: UPDATE_FACETS,
	facets
});
