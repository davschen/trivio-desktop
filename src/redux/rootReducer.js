import { combineReducers } from 'redux';
import userReducer from './user/userSlice';
import customSetsReducer from "./customSets/customSetsSlice";
import gameplayReducer from "./gameplay/gameplaySlice";

const rootReducer = combineReducers({
  user: userReducer, 
  customSets: customSetsReducer,
  gameplay: gameplayReducer,
});

export default rootReducer;