import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import DevTools from '../example/containers/dev-tools'
import * as searchReducers from '../reducer';
import searchMiddleware from '../middleware/user-middleware'
const store = createStore(
  combineReducers({...searchReducers}),
  compose(
    applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    ),
    DevTools.instrument()
  )

)


export default store;
