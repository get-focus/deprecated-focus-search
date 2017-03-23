import {actionSearchBuilder} from '../../actions/action-search-builder'
import {singleActionCreatorBuilder} from '../../actions/single-action-creator'
import {unitSearchReducerBuilder} from '../../reducer'
import {serviceSearch} from '../services/search'
import {searchTriggerMiddlewareBuilder} from '../../middleware/middleware-search';

//advanced_search
export const searchAction = actionSearchBuilder({name: 'quickSearch', type: 'search', service: serviceSearch});
export const {creators : unitSearchActions, types : unitSearchActionsTypes} = singleActionCreatorBuilder('quickSearch');
export const unitSearchReducers = unitSearchReducerBuilder('quickSearch')
export const middlewareQuickSearch = searchTriggerMiddlewareBuilder(
    [
        'QUICKSEARCH_NEXT_PAGE',
        'QUICKSEARCH_START_SEARCH',
        'QUICKSEARCH_UPDATE_QUERY',
        'QUICKSEARCH_UPDATE_SELECTED_FACETS',
        'QUICKSEARCH_UPDATE_GROUP',
        'QUICKSEARCH_UPDATE_SORT'
    ]
    , state => state.quickSearch,searchAction.action
);
