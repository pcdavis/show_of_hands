import _ from "lodash";
import { FETCH_STACKS, FETCH_STACK_TITLES, SET_TEACHER_ID } from "../actions";
// FETCH_STACK, DELETE_STACK, CREATE_STACK

const initialState = {
  stacks: [],
  stackTitles: {},
  teacherID: null
};


export default function( state = initialState, action ) {
  switch(action.type){
    
    case FETCH_STACKS:
    console.log("inside reducer_stacks.js using case FETCH_STACKS, here is the action payload data", action.payload.data)
    // let fetchedStacks= _.mapKeys(action.payload.data, "content_id");
    return Object.assign({}, state, {stacks: action.payload.data})
    
    case FETCH_STACK_TITLES:
    console.log("inside reducer_stacks.js using case FETCH_STACK_TITLES, here is the action payload data", action.payload.data)
    let fetchedTitles= _.mapKeys(action.payload.data, "stack_id");
    console.log("here is the lodashed object from _map of fetchedTitles ", fetchedTitles)
    return Object.assign({}, state, {stackTitles: fetchedTitles})
    
    case SET_TEACHER_ID:
    console.log("inside reducer_stacks.js using case SET_TEACHER_ID, here is the action payload data", action.payload)
    return Object.assign({}, state, {teacherID: action.payload})
     

    default:
      return state
  }
}

//maybe pass it a cb that gets
