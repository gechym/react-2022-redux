import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './Reducer';

const composeEnhancers = composeWithDevTools();
const store = createStore(rootReducer, composeEnhancers);

export default store;
