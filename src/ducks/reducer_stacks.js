import _ from "lodash";
import { FETCH_STACKS, } from "../actions";
// FETCH_STACK, DELETE_STACK, CREATE_STACK

const initialState = {
  stacks: {},
  test: 'test'
};

// delete me later
export function test(val) {
  return {
    type: 'TEST',
    payload: val
  }
}

export default function( state = initialState, action ) {
  switch(action.type){
    case 'TEST':
    return Object.assign({}, state, {test: action.payload})

    case FETCH_STACKS:
    console.log("inside reducer_stacks.js using case FETCH_STACKS, here is the action payload data", action.payload.data)
    return _.mapKeys(action.payload.data, "stack_id");
    
     

    default:
      return state
  }
}


