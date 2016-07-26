import {actionSearchBuilder} from '../../actions/action-search-builder'
import {singleActionCreatorBuilder} from '../../actions/single-action-creator'
import {unitSearchReducerBuilder} from '../../reducer'
import {serviceSearch} from '../services/search'
import {searchTriggerMiddlewareBuilder} from '../../middleware/middleware-search';

//advanced_search
export const searchAction = actionSearchBuilder({name: 'advanced_search', type: 'search', service: serviceSearch});
export const {creators : unitSearchActions, types : unitSearchActionsTypes} = singleActionCreatorBuilder('advanced_search');
export const unitSearchReducers = unitSearchReducerBuilder('advanced_search')
export const middlewareAdvancedSearch = searchTriggerMiddlewareBuilder(unitSearchActionsTypes, state => state.advancedSearch,searchAction.action);



// export const otherSearchAction = actionSearchBuilder({name: 'other_search', type: 'search', service: serviceSearch});
// export const {creators : unitOtherSearchActions, types : unitOtherSearchTypes} = singleActionCreatorBuilder('advanced_search');
// export const unitOtherSearchReducers = unitSearchReducerBuilder('other_search')
// export const middlewareOtherSearch = searchTriggerMiddlewareBuilder(otherSearchAction.action, unitOtherSearchTypes);
