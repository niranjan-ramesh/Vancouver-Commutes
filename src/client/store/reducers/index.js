import { combineReducers } from 'redux';
import healthReducer from './healthReducer';
import snackbarReducer from './snackbarReducer';
import locationSelectReducer from './locationSelectReducer';

const reducers = combineReducers({
  healthReducer,
  snackbarReducer,
  locationSelectReducer,
});

export default reducers;
