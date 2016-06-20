import builder from 'focus-redux/store/builder';
import rootReducer from '../reducer';
import {INPUT_CHANGE} from 'focus-redux/actions/input';


const lastNameMiddleware = store => next => action => {
    if (action.type === INPUT_CHANGE && action.fieldName == 'firstName') {
        const lastNameAction = {...action};
        lastNameAction.fieldName = 'lastName';
        lastNameAction.rawValue = action.rawValue.toUpperCase();
        next(action);
        store.dispatch(lastNameAction);
    } else {
        next(action);
    }
}

export default lastNameMiddleware;
