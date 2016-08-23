import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import DevTools from '../containers/dev-tools'
import {unitSearchReducers, unitOtherSearchReducers} from '../actions/search-actions';
import {middlewareAdvancedSearch, middlewareOtherSearch} from '../actions/search-actions'

export default createStore(
    combineReducers({advancedSearch : unitSearchReducers, otherSearch : unitOtherSearchReducers}),
    compose(
        applyMiddleware(
            thunkMiddleware,
            middlewareAdvancedSearch // lets us dispatch() functions
        ),
        DevTools.instrument()
    )
);
