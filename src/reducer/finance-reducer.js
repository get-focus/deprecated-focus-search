import {reducerBuilder} from 'focus-redux/reducers/reducer-builder';
import {loadFinanceTypes} from '../actions/finance-actions';
import {saveFinanceTypes} from '../actions/finance-actions';

// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_LOAD_FINANCE, RESPONSE_LOAD_FINANCE, ERROR_LOAD_FINANCE} = loadFinanceTypes;

// Récupération des types des trois actions redux créé par l'actionBuilder
const {REQUEST_SAVE_FINANCE, RESPONSE_SAVE_FINANCE, ERROR_SAVE_FINANCE} = saveFinanceTypes;

// Données initiales pour la state redux
// const DEFAULT_DATA = {
//     firstName:'Amélie'
// };

// Utilisation du reducerBuilder qui attends le type des trois actions créés par l'actionBuimlder
const financeReducer = reducerBuilder({
    types: {
        load: {request: REQUEST_LOAD_FINANCE, response: RESPONSE_LOAD_FINANCE, error: ERROR_LOAD_FINANCE},
        save: {request: REQUEST_SAVE_FINANCE, response: RESPONSE_SAVE_FINANCE, error: ERROR_SAVE_FINANCE}
    },
    //defaultData: DEFAULT_DATA
});

export default financeReducer;
