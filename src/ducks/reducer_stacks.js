import _ from "lodash";
import { FETCH_STACKS, FETCH_STACK, DELETE_STACK, CREATE_STACK } from "../actions";


const initialState = {
  stacks: {}
};


export default function( state = initialState, action ) {
  switch(action.type){
    case FETCH_STACKS:
    console.log("inside reducer_stacks.js using case FETCH_STACKS, here is the action payload data", action.payload.data)
    return _.mapKeys(action.payload.data, "stack_id");
    
     

    default:
      return state
  }
}

//maybe pass it a cb that gets
