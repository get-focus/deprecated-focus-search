import {createStoreWithFocus} from './createStore';
import DevTools from '../containers/dev-tools'
import {unitQuickSearchReducers, unitAdvancedSearchReducers} from '../actions/search-actions';
import {middlewareQuickSearch, middlewareAdvancedSearch} from '../actions/search-actions'

let applicationStore;

export const initializeStore = () => {
    applicationStore = createStoreWithFocus(
        {
            advancedSearch : unitAdvancedSearchReducers,
            quickSearch : unitQuickSearchReducers
        },
        [middlewareQuickSearch, middlewareAdvancedSearch],
        [DevTools.instrument()]
    );
    return applicationStore;
};

export const getStore = () => {
    return applicationStore;
};
