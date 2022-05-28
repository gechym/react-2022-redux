import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './Reducer';
import rootSage from './saga/rootSage';

// import thunkMiddleware from './redux-thunk(test)';

// Middleware thunk

const sageMiddleware = createSagaMiddleware();
const middlewares = [thunkMiddleware, sageMiddleware];

const middlewareEnhancers = applyMiddleware(...middlewares);

const composeEnhancers = composeWithDevTools(middlewareEnhancers);

const store = createStore(rootReducer, composeEnhancers);

sageMiddleware.run(rootSage);

// remove devtool - Production env
// const middlewares = [thunk];
// const middlewareEnhancers = applyMiddleware(...middlewares);
// const store = createStore(rootReducer, middlewareEnhancers);

export default store;
