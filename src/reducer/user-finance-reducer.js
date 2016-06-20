import {reducerBuilder} from 'focus-redux/reducers/reducer-builder';
import {loadUserFinanceTypes, saveUserFinanceTypes} from '../actions/finance-user-actions';


// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_LOAD_FINANCE, RESPONSE_LOAD_FINANCE, ERROR_LOAD_FINANCE} = loadUserFinanceTypes;

// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_SAVE_FINANCE, RESPONSE_SAVE_FINANCE, ERROR_SAVE_FINANCE} = saveUserFinanceTypes;


// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_LOAD_USER, RESPONSE_LOAD_USER, ERROR_LOAD_USER} = loadUserFinanceTypes;

// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_SAVE_USER, RESPONSE_SAVE_USER, ERROR_SAVE_USER} = saveUserFinanceTypes;

// Données initiales pour la state redux
const DEFAULT_DATA = {
    name:'Amélie',
    amount: '78'
};

//reducerBuilder({name:'Finance',  types: {load: loadUserFinanceTypes, save: saveUserFinanceTypes}, defaultData: DEFAULT_DATA})

// Utilisation du reducerBuilder qui attends le type des trois actions créés par l'actionBuimlder
export const financeUserReducer = reducerBuilder({
    types: {
        load: {request: REQUEST_LOAD_FINANCE, response: RESPONSE_LOAD_FINANCE, error: ERROR_LOAD_FINANCE},
        save: {request: REQUEST_SAVE_FINANCE, response: RESPONSE_SAVE_FINANCE, error: ERROR_SAVE_FINANCE}
    },
    defaultData: DEFAULT_DATA
});

export const userfinanceReducer = reducerBuilder({
    types: {
        load: {request: REQUEST_LOAD_USER, response: RESPONSE_LOAD_USER, error: ERROR_LOAD_USER},
        save: {request: REQUEST_SAVE_USER, response: RESPONSE_SAVE_USER, error: ERROR_SAVE_USER}
    },
    defaultData: DEFAULT_DATA
});
