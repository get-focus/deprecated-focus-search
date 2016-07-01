import {actionSearchBuilder} from '../../actions/action-builder-search'
import {serviceSearch} from '../services/search'

export const searchAction = actionSearchBuilder({names: 'lala', type: 'search', service: serviceSearch});
