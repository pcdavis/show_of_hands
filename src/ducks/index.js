import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; //as enables an alias to be used
import StacksReducer from "./reducer_stacks.js";
import SocketroomReducer from "./reducer_socketroom.js";

const rootReducer = combineReducers({
  stack_content: StacksReducer,
  socketroom: SocketroomReducer,
  form: formReducer
});

export default rootReducer;



