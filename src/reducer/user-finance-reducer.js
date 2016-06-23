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


// Utilisation du reducerBuilder qui attends le type des trois actions créés par l'actionBuimlder
export const financeUserReducer = reducerBuilder({
  name: 'finance',
  loadTypes: {REQUEST_LOAD_FINANCE, RESPONSE_LOAD_FINANCE, ERROR_LOAD_FINANCE} ,
  saveTypes: {REQUEST_SAVE_FINANCE, RESPONSE_SAVE_FINANCE, ERROR_SAVE_FINANCE}
});

export const userfinanceReducer = reducerBuilder({
    name: 'user',
    saveTypes: {REQUEST_SAVE_USER, RESPONSE_SAVE_USER, ERROR_SAVE_USER},
    loadTypes : {REQUEST_LOAD_USER, RESPONSE_LOAD_USER, ERROR_LOAD_USER},
    defaultData: DEFAULT_DATA
});
