import {builderAdvancedSearchMiddleware} from '../../middleware/middleware-search';
import {searchAction, otherSearchAction} from '../actions/search-actions';
export const middlewareAdvancedSearch = builderAdvancedSearchMiddleware(searchAction, 'advanced_search', ['SELECTED_FACETS' ]);
export const middlewareOtherSearch = builderAdvancedSearchMiddleware(otherSearchAction, 'other_search');
