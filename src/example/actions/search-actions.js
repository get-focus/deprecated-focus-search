import {actionSearchBuilder} from '../../actions/action-builder-search'
import {unitSearchActionBuilder} from '../../actions/action-search'
import {unitSearchReducerBuilder} from '../../reducer/reducer-search'
import {serviceSearch} from '../services/search'

//advanced_search
export const searchAction = actionSearchBuilder({name: 'advanced_search', type: 'search', service: serviceSearch});
export const unitSearchActions = unitSearchActionBuilder('advanced_search')
export const unitSearchReducers = unitSearchReducerBuilder('advanced_search')

//quick_search
export const otherSearchAction = actionSearchBuilder({name: 'other_search', type: 'search', service: serviceSearch});
export const unitOtherSearchActions = unitSearchActionBuilder('other_search')
export const unitOtherSearchReducers = unitSearchReducerBuilder('other_search')
