import {reducerBuilder} from 'focus-redux/reducers/reducer-builder';
import {loadUserTypes} from '../actions/user-actions';
import {saveUserTypes} from '../actions/user-actions';

// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_LOAD_USER, RESPONSE_LOAD_USER, ERROR_LOAD_USER} = loadUserTypes;

// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_SAVE_USER, RESPONSE_SAVE_USER, ERROR_SAVE_USER} = saveUserTypes;

// Données initiales pour la state redux
const DEFAULT_DATA = {
    firstName:'Amélie'
};

// Utilisation du reducerBuilder qui attends le type des trois actions créés par l'actionBuimlder
const userReducer = reducerBuilder({
    types: {
        load: {request: REQUEST_LOAD_USER, response: RESPONSE_LOAD_USER, error: ERROR_LOAD_USER},
        save: {request: REQUEST_SAVE_USER, response: RESPONSE_SAVE_USER, error: ERROR_SAVE_USER}
    },
    defaultData: DEFAULT_DATA
});

export default userReducer;
