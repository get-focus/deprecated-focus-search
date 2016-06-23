import {MY_ACTION} from '../actions/custom-actions';

const customReducer = (state = {}, action) => {
   switch(action.type) {
       case MY_ACTION:
         return state = {victoire: 'De la Gloire'}
       default:
         return state = {echec: "De l'echec" };
   }
};

export default customReducer;
