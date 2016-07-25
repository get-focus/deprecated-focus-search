import {actionSearchBuilder} from '../../actions/action-search-builder'
import {singleActionCreatorBuilder} from '../../actions/single-action-creator'
import {unitSearchReducerBuilder} from '../../reducer'
import {serviceSearch} from '../services/search'

//advanced_search
export const searchAction = actionSearchBuilder({name: 'advanced_search', type: 'search', service: serviceSearch});
const {creators : unitSearchActions, types : unitSearchActionsTypes} = singleActionCreatorBuilder('advanced_search');

export unitSearchActions;

export const unitSearchReducers = unitSearchReducerBuilder('advanced_search')

//quick_search
export const otherSearchAction = actionSearchBuilder({name: 'other_search', type: 'search', service: serviceSearch});
export const unitOtherSearchActions = unitSearchActionBuilder('other_search')
export const unitOtherSearchReducers = unitSearchReducerBuilder('other_search')
