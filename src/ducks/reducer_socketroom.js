import _ from "lodash";
import { CREATE_BROADCAST, FETCH_BROADCAST_CONTENT, SET_CURRENT_QUIZ } from "../actions";
// FETCH_STACK, DELETE_STACK, CREATE_STACK

const initialState = {
  broadcast_id: null,
  broadcast_stack_id: null,
  broadcast_code: '',
  broadcast_stack: [],
  current_quiz:{}
};


export default function( state = initialState, action ) {
  switch(action.type){
    
    case CREATE_BROADCAST:
    console.log("inside reducer_socketroom.js using case CREATE_BROADCAST, here is the action payload data", action.payload)
    let returned_broadcast_id= action.payload.broadcast_id
    let returned_stack_id= action.payload.stack_id
    let returned_broadcast_code= action.payload.broadcast_code
    let returned_broadcast_stack= action.payload.broadcast_stack
    
    return Object.assign({}, state, {
        broadcast_id: returned_broadcast_id,
        broadcast_stack_id: returned_stack_id,
        broadcast_code: returned_broadcast_code,
        broadcast_stack: returned_broadcast_stack
    })
    //TODO I think now that I'm updating socketroom state directly from inside stack.j when starting a broadcast, I won't need this reducer
    case FETCH_BROADCAST_CONTENT:
    console.log("inside reducer_socketroom.js using case FETCH_BROADCAST_CONTENT, here is the action payload data", action.payload)

    return Object.assign({}, state, { broadcast_stack: action.payload })
    
 
    case SET_CURRENT_QUIZ:
    console.log("inside reducer_socketroom.js using case SET_CURRENT_QUIZ, here is the action payload data", action.payload)

    return Object.assign({}, state, { current_quiz: action.payload })
    
 
    default:
      return state
  }
}
