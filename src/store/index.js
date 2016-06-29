import {createStore, combineReducers} from 'redux';
import DevTools from '../example/containers/dev-tools'
import * as searchReducers from '../reducer';

const store = createStore(combineReducers({...searchReducers}), DevTools.instrument())

export default store;
