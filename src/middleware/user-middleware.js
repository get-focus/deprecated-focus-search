import builder from 'focus-redux/store/builder';
import rootReducer from '../reducer';
import {INPUT_CHANGE, INPUT_ERROR} from 'focus-redux/actions/input';


export const amoutToUpperCaseMiddleware = store => next => action => {
    const {forms, definitions, domains} = store.getState();
    if (action.type === INPUT_CHANGE && action.fieldName == 'amount') {
        const {formKey} = action;
        const {fields} = forms.find(f=> f.formKey === formKey);
        const lastNameAction = {...action};
        lastNameAction.fieldName = 'name';
        lastNameAction.rawValue =  fields.find(f => f.name == 'name').rawInputValue.toUpperCase();
        next(action);
        store.dispatch(lastNameAction);
    } else {
        next(action);
    }
}


export const errorFieldMiddleware = store => next => action => {
    const {forms, definitions, domains} = store.getState();
    if (action.type === INPUT_CHANGE && action.fieldName == 'amount') {
        const errorAction = {};
        errorAction.type = 'INPUT_ERROR';
        errorAction.formKey = action.formKey;
        errorAction.fieldName = 'name';
        errorAction.entityPath = action.entityPath;
        errorAction.error = "Une erreur venue de l'espace !! "
        next(action);
        store.dispatch(errorAction);
    } else {
        next(action);
    }
}
