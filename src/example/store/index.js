import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import DevTools from '../containers/dev-tools'
import {unitSearchReducers} from '../actions/search-actions';
import {middlewareQuickSearch} from '../actions/search-actions'

const store = createStore(
  combineReducers({quickSearch : unitSearchReducers}),
  compose(
    applyMiddleware(
      thunkMiddleware,

      middlewareQuickSearch// lets us dispatch() functions
    ),
    DevTools.instrument()
  )

)


export default store;
