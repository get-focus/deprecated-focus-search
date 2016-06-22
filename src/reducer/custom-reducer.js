import {MY_ACTION} from '../actions/custom-actions';

const customReducer = (state = {}, action) => {
   switch(action.type) {
       case MY_ACTION:
         return state.message = {victoire: 'De la Gloire'}
       default:
         return state.message = {echec: "De l'echec" };
   }
};

export default customReducer;
