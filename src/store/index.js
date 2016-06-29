import builder from 'focus-redux/store/builder';
import rootReducer from '../../src/reducer';
import DevTools from '../containers/dev-tools'

const store = builder(rootReducer, [DevTools.instrument()]);

export default store;
