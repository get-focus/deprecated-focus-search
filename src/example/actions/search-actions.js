import {actionSearchBuilder} from '../../actions/action-search-builder'
import {singleActionCreatorBuilder} from '../../actions/single-action-creator'
import {unitSearchReducerBuilder} from '../../reducer'
import {serviceSearch} from '../services/search'
import {searchTriggerMiddlewareBuilder} from '../../middleware/middleware-search';

//advanced_search
export const searchAction = actionSearchBuilder({name: 'advancedSearch', type: 'search', service: serviceSearch});
export const {creators : unitSearchActions, types : unitSearchActionsTypes} = singleActionCreatorBuilder('advancedSearch');
export const unitSearchReducers = unitSearchReducerBuilder('advancedSearch')
export const middlewareAdvancedSearch = searchTriggerMiddlewareBuilder([], state => state.advancedSearch,searchAction.action);



// export const otherSearchAction = actionSearchBuilder({name: 'other_search', type: 'search', service: serviceSearch});
// export const {creators : unitOtherSearchActions, types : unitOtherSearchTypes} = singleActionCreatorBuilder('advanced_search');
// export const unitOtherSearchReducers = unitSearchReducerBuilder('other_search')
// export const middlewareOtherSearch = searchTriggerMiddlewareBuilder(otherSearchAction.action, unitOtherSearchTypes);
