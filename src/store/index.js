import builder from 'focus-redux/store/builder';
import rootReducer from '../../src/reducer';
import {amoutToUpperCaseMiddleware, errorFieldMiddleware} from '../../src/middleware/user-middleware';

const store = builder(rootReducer, [errorFieldMiddleware]);

export default store;
