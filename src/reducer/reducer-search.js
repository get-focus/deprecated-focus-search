import {UPDATE_QUERY} from '../actions/action-search';
const search = (state = [], action) => {
   console.log('lolo');
   switch(action.type) {
	   case UPDATE_QUERY:
       console.log('lala');
  		 return [
         ...state,
         {query : action.query}
       ];
	   default:
		   return state;
   }
};
export default search;
