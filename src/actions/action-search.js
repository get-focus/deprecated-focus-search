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
