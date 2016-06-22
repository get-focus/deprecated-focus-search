import builder from 'focus-redux/store/builder';
import rootReducer from '../../src/reducer';
import {amoutToUpperCaseMiddleware, errorFieldMiddleware, ownActiondMiddleware} from '../../src/middleware/user-middleware';
import DevTools from '../containers/dev-tools'

const store = builder(rootReducer, [errorFieldMiddleware, amoutToUpperCaseMiddleware,ownActiondMiddleware], [DevTools.instrument()]);

export default store;
