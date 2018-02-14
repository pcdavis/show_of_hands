import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; //as enables an alias to be used
import StacksReducer from "./reducer_stacks.js";

const rootReducer = combineReducers({
  stacks: StacksReducer,
  form: formReducer
});

export default rootReducer;



