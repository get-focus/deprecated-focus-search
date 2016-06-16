import {reducerBuilder} from 'focus-redux/reducers/reducer-builder';
import {loadUserTypes} from '../actions/user-actions';
import {saveUserTypes} from '../actions/user-actions';


const {REQUEST_LOAD_USER, RESPONSE_LOAD_USER, ERROR_LOAD_USER} = loadUserTypes;
const {REQUEST_SAVE_USER, RESPONSE_SAVE_USER, ERROR_SAVE_USER} = saveUserTypes;


const DEFAULT_DATA = {
    firstName:'UserYolo'
};


const userReducer = reducerBuilder({
    types: {
        load: {request: REQUEST_LOAD_USER, response: RESPONSE_LOAD_USER, error: ERROR_LOAD_USER},
        save: {request: REQUEST_SAVE_USER, response: RESPONSE_SAVE_USER, error: ERROR_SAVE_USER}
    },
    defaultData: DEFAULT_DATA
});

export default userReducer;
