import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import DevTools from '../containers/dev-tools'
import {unitSearchReducers, unitOtherSearchReducers} from '../actions/search-actions';
import {middlewareAdvancedSearch, middlewareOtherSearch} from '../middleware/middleware-search'

const store = createStore(
  combineReducers({search : unitSearchReducers, otherSearch : unitOtherSearchReducers}),
  compose(
    applyMiddleware(
      thunkMiddleware,
      middlewareOtherSearch,
      middlewareAdvancedSearch// lets us dispatch() functions
    ),
    DevTools.instrument()
  )

)


export default store;
