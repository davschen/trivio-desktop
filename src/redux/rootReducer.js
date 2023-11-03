import { combineReducers } from 'redux';
import userReducer from './user/userSlice';
import customSetsReducer from "./customSets/customSetsSlice";

const rootReducer = combineReducers({
  user: userReducer, 
  customSets: customSetsReducer,
});

export default rootReducer;