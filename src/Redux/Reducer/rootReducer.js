import { combineReducers } from 'redux';
import ageReducer from './ageReducer';
import nameReducer from './nameReducer';

const rootReducer = combineReducers({
    nameState: nameReducer,
    ageState: ageReducer,
});

export default rootReducer;
