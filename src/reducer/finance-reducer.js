import {reducerBuilder} from 'focus-redux/reducers/reducer-builder';
import {loadFinanceTypes} from '../actions/finance-actions';
import {saveFinanceTypes} from '../actions/finance-actions';


// Données initiales pour la state redux
// const DEFAULT_DATA = {
//     firstName:'Amélie'
// };

// Utilisation du reducerBuilder qui attends le type des trois actions créés par l'actionBuimlder
const financeReducer = reducerBuilder({
  name: 'finance',
  loadTypes: loadFinanceTypes,
  saveTypes: saveFinanceTypes
});


export default financeReducer;
