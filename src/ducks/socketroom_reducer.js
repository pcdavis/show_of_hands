import { IS_TEACHER, LOAD_STACK_INTO_ROOM, UPDATE_STUDENT_VIEW  } from "../actions";



const initialState = {
  socketroom_stack: {},
//   test: 'test',
  isTeacher: false,
  student_view: {}
};

// delete me later
// export function test(val) {
//   return {
//     type: 'TEST',
//     payload: val
//   }
// }

//Here is the default reducer that will get imported into the reducer index
export default function( state = initialState, action ) {
  switch(action.type){
    // case 'TEST':
    // return Object.assign({}, state, {test: action.payload})

    case IS_TEACHER:
        return Object.assign({}, state, {isTeacher: action.payload})

    case LOAD_STACK_INTO_ROOM:
        return Object.assign({}, state, {socketroom_stack: action.payload})

    case UPDATE_STUDENT_VIEW:
        return Object.assign({}, state, {student_view: action.payload})

    default:
      return state
  }
}


