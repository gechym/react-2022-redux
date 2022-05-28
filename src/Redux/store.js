// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import { rootReducer } from './Reducer';
// import thunk from 'redux-thunk';
// // import thunkMiddleware from './redux-thunk(test)';

// const middlewares = [thunk];
// const middlewareEnhancers = applyMiddleware(...middlewares);

// const composeEnhancers = composeWithDevTools(middlewareEnhancers);
// const store = createStore(rootReducer, composeEnhancers);

// // const middlewares = [thunk];
// // const middlewareEnhancers = applyMiddleware(...middlewares);

// // const store = createStore(rootReducer, middlewareEnhancers);

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '~/Redux/toolkit/useSlice';

const store = configureStore({
    reducer: {
        userState: userReducer,
    },
});

export default store;
