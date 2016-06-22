// const DEFAULT_STATE = {user: {name: 'Pierre', date: new Date().getTime(), bababa: 'dddididid'}};
// const rootReducer = (state = DEFAULT_STATE) => state

import {combineReducers} from 'redux';
import user from './user-reducer';
import finance from './finance-reducer';
import customReducer from './custom-reducer'
//import {userfinanceReducer, financeUserReducer} from './user-finance-reducer'

export default combineReducers({
    user,
    finance,
    customData : customReducer
  });
