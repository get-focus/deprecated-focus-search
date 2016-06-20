import builder from 'focus-redux/store/builder';
import rootReducer from '../../src/reducer';
import lastNameMiddleware from '../../src/middleware/user-middleware';

const store = builder(rootReducer, [lastNameMiddleware]);

export default store;
