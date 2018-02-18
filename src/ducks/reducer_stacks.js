import _ from "lodash";
import { FETCH_STACKS, } from "../actions";
// FETCH_STACK, DELETE_STACK, CREATE_STACK

const initialState = {
  stacks: {},
  test: 'test'
};

//TODO a temporary action creator to test socket delete me later
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
    //TODO delete this test case when done testing

    case FETCH_STACKS:
    //The _.mapKeys is a lodash method that takes the array that gets returned from axios and turns it into an object and asigns the "stack_id" as the key value for each of the stack objects. So now it is a big object that contains keys (equal to "stack_id") that have values equal to the stack object associated with that stack_id
    //TODO - this won't work!!! multiple objects have the same stack_id
    console.log("inside reducer_stacks.js using case FETCH_STACKS, here is the action payload data", action.payload.data)
    return _.mapKeys(action.payload.data, "stack_id");
    
     

    default:
      return state
  }
}


