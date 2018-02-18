//This is a single file for all action-creators in this app

import axios from "axios";

//String constants to be used by reducer switch
export const FETCH_STACKS = "fetch_stacks";
export const FETCH_STACK = "fetch_stack";
export const CREATE_STACK = "create_stack";
export const DELETE_STACK = "delete_stack";
export const IS_TEACHER = "is_teacher";
export const LOAD_STACK_INTO_ROOM = "load_stack_into_room";
export const UPDATE_STUDENT_VIEW = "update_student_view";

//TODO - remove this action creator after done testing. It will test the socket.io-redux npm package ability to work

export function socketReduxTest(value) {
  return {
    type: 'SOCKET_REDUX_TEST',
    payload: {
      message: 'Using socket.io-redux middleware',
    },
    meta: {
      socket: {
        channel: 'add:todo',
        namespace: 'ns',
        room: 'room',
      },
    },
  };
}

//Action Creators for the teacher's dashboard ----------------------------------------------
export function fetchStacks() {
    //TODO Need to turn the response, which is an array of all quizes from all stacks belonging to the user_id into an array object that looks something like this: 
    let serverResponse = axios.get('/api/stacks')
     return {
       type: FETCH_STACKS,
       payload: serverResponse
     };
 }

export function fetchStackItems() {
  let serverResponse = axios.get('/api/stacks_items?q_stack_id = stack_id')
 
   return {
     type: FETCH_STACKS,
     payload: serverResponse
   };
}

export function createStack(title){
  console.log('createStack actino crreator fired')
  axios.post('/api/newstack', title)
  .catch(error => console.log(error));
  return {
    type: CREATE_STACK,
    payload: "hello from createStack"
  };
}
// export function createStack(title, callback){
//   console.log('createStack actino crreator fired')
//   axios.post('/api/newstack', title)
//   .then(() => callback())
//   .catch(error => console.log(error));

//   return {
//     type: CREATE_STACK,
//     payload: "hello from createStack"
//   }

//Action Creators for the teacher's classroom UI --------------------------------------
//TODO: Need to create server endpoint and controller to return status of req.user.isTeacher. For now I'll card code true
export function checkIsTeacher() {
  let serverResponse = axios.get('/api/teacher')
   return {
     type: IS_TEACHER,
     payload: true
   };
}

export function loadStackIntoRoom() {
  // let serverResponse = axios.get('/api/teacher')
  // here's some dummy data to try
  // {stack_id: 4, stack_title: "Solar System Quiz", quizes: [
  //   {quiz_id: 12, 
  //    question: "Which planet is the largest?",
  //    correct_answer:	"Jupiter",
  //    false_1: "Venus",
  //    false_2:	"Saturn",
  //    false_3:	"Neptune",
  //      10	null	4	12	1	4	Solar System Quiz	}

  // ] }
   return {
     type: LOAD_STACK_INTO_ROOM,
     payload: { }
   };
}

export function updateStudentView() {
  // let serverResponse = axios.get('/api/teacher')
   return {
     type: UPDATE_STUDENT_VIEW,
     payload: true
   };
}




