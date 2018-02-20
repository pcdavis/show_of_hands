import _ from "lodash";
import { CREATE_BROADCAST, FETCH_BROADCAST_CONTENT } from "../actions";
// FETCH_STACK, DELETE_STACK, CREATE_STACK

const initialState = {
  broadcast_id: null,
  broadcast_stack_id: null,
  broadcast_code: '',
  broadcast_stack: []
};


export default function( state = initialState, action ) {
  switch(action.type){
    
    case CREATE_BROADCAST+ '_FULFILLED':
    console.log("inside reducer_socketroom.js using case CREATE_BROADCAST, here is the action payload data", action.payload.data)
    let returned_broadcast_id= action.payload.data.broadcast_id
    let returned_stack_id= action.payload.data.stack_id
    let returned_broadcast_code= action.payload.data.broadcast_code
    
    return Object.assign({}, state, {
        broadcast_id: returned_broadcast_id,
        broadcast_stack_id: returned_stack_id,
        broadcast_code: returned_broadcast_code
    })
    
    case FETCH_BROADCAST_CONTENT:
    console.log("inside reducer_socketroom.js using case FETCH_BROADCAST_CONTENT, here is the action payload data", action.payload.data)

    return Object.assign({}, state, { broadcast_stack: action.payload.data })
    
 
    default:
      return state
  }
}
