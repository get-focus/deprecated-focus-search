import {actionSearchBuilder} from '../../actions/action-search-builder'
import {singleActionCreatorBuilder} from '../../actions/single-action-creator'
import {unitSearchReducerBuilder} from '../../reducer'
import {serviceSearch} from '../services/search'
import {searchTriggerMiddlewareBuilder} from '../../middleware/middleware-search';

//quick_search
export const quickSearchAction = actionSearchBuilder({name: 'quickSearch', type: 'search', service: serviceSearch});
export const {creators : unitQuickSearchActions, types : unitQuickSearchActionsTypes} = singleActionCreatorBuilder('quickSearch');
export const unitQuickSearchReducers = unitSearchReducerBuilder('quickSearch')
export const middlewareQuickSearch = searchTriggerMiddlewareBuilder(
    [
        'QUICKSEARCH_NEXT_PAGE',
        'QUICKSEARCH_START_SEARCH',
        'QUICKSEARCH_UPDATE_QUERY',
        'QUICKSEARCH_UPDATE_SELECTED_FACETS',
        'QUICKSEARCH_UPDATE_GROUP',
        'QUICKSEARCH_UPDATE_SORT'
    ],
    state => state.quickSearch, quickSearchAction.action
);

//advanced_search
export const advancedSearchAction = actionSearchBuilder({name: 'advancedSearch', type: 'search', service: serviceSearch});
export const {creators : unitAdvancedSearchActions, types : unitAdvancedSearchActionsTypes} = singleActionCreatorBuilder('advancedSearch');
export const unitAdvancedSearchReducers = unitSearchReducerBuilder('advancedSearch');
export const middlewareAdvancedSearch = searchTriggerMiddlewareBuilder(
    [
        'ADVANCEDSEARCH_NEXT_PAGE',
        'ADVANCEDSEARCH_START_SEARCH',
        'ADVANCEDSEARCH_UPDATE_QUERY',
        'ADVANCEDSEARCH_UPDATE_SELECTED_FACETS',
        'ADVANCEDSEARCH_UPDATE_GROUP',
        'ADVANCEDSEARCH_UPDATE_SORT'
    ],
    state => state.advancedSearch, advancedSearchAction.action
);
