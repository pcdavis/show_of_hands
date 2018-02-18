import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; //as enables an alias to be used
import StacksReducer from "./reducer_stacks.js";
import SocketRoomReducer from "./socketroom_reducer";

const rootReducer = combineReducers({
  stacks: StacksReducer,
  socketRoom: SocketRoomReducer,
  form: formReducer
});

export default rootReducer;



