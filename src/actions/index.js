import axios from "axios";
import _ from 'lodash'

export const FETCH_STACKS = "fetch_stacks";
export const FETCH_STACK = "fetch_stack";
export const CREATE_STACK = "create_stack";
export const DELETE_STACK = "delete_stack";
export const FETCH_STACK_TITLES = "FETCH_STACK_TITLES";
export const CREATE_BROADCAST = "CREATE_BROADCAST";
export const SET_TEACHER_ID = "SET_TEACHER_ID";
export const FETCH_BROADCAST_CONTENT = "FETCH_BROADCAST_CONTENT";
export const SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ";
export const SET_STUDENT_ID = "SET_STUDENT_ID";
export const CREATE_QUIZ = "CREATE_QUIZ";

export function fetchStacks() {
    let serverResponse = axios.get('/api/stacks')
   
     return {
       type: FETCH_STACKS,
       payload: serverResponse
     };
 }

export function fetchStackTitles() {
    let serverResponse = axios.get('/api/stacktitles')
   
     return {
       type: FETCH_STACK_TITLES,
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

 export function createStack(title, callback){
  console.log('createStack actino crreator fired and here is the title being passed to axios as its body object ', title)
  axios.post('/api/newstack', {title})
  .then(() => callback())
  .catch(error => console.log(error));

  return {
    type: CREATE_STACK,
    payload: {}
  }
}
//Below is my monday feb 5 attempt to fix create quiz and stackcontent--------------------------------------------------------------------------------------------------------------------------------------------
 export function ac_createNewQuiz(newQuizObj, callback){
  console.log('ac-NEWQUIZ acation crreator fired and here is the title being passed to axios as its body object ', newQuizObj)
  axios.post('/api/newquestion', newQuizObj)
  .then((response) => {
    console.log('hello from ac')
    callback(response)
  } )
  .catch(error => console.log(error));

  // return {
  //   type: CREATE_QUIZ,
  //   payload: {}
  // }
}
//--------------------------------------------------------------
 export function deleteStack(stackID, callback){
  console.log('deleteStack action crreator fired and here is the stackID being passed to axios as its body object ', stackID)
  axios.delete('/api/deletestack/'+stackID)
  .then((response) => {
    console.log(response)
    callback();
  } )
  .catch(error => console.log(error));

  return {
    type: DELETE_STACK,
    payload: stackID
  }
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

export function createBroadcast(serverResponse){
  console.log('createBroadcast fired from action creator index and here is the serverResponse being passed in ', serverResponse)

  return {
    type: CREATE_BROADCAST,
    payload: serverResponse
  }
}
//TODO  this version below was working prior to changing strategy to update redux from inside here before jumping into the classroom. It uses a callback to jump into classroom
// export function createBroadcast(broadcastObj, callback){
//   console.log('createBroadcast fired from action creator index and here is the broadcastObj being passed to axios as its body object ', broadcastObj)
//   let serverResponse = axios.post('/api/newbroadcast', {broadcastObj})
//   .then(() => callback())
//   .catch(error => console.log(error));

//   return {
//     type: CREATE_BROADCAST,
//     payload: serverResponse
//   }
// }

export function fetchBroadcast(broadcast_id){
  console.log('fetchBroadcast fired from action creator index and here is the broadcast_id being passed to axios as its body object ', broadcast_id)
  let serverResponse = axios.post('/api/broadcast', {broadcast_id}).then( resp => resp.data)
  .catch(error => console.log(error));

  return {
    type: FETCH_BROADCAST_CONTENT,
    payload: serverResponse
  }
}

export function setTeacherID(teacher_id){
  console.log('setTeacherID fired from action creator index and here is the teacherID being passed in as the argument ', teacher_id)
  return {
    type: SET_TEACHER_ID,
    payload: teacher_id
  }
}

export function ac_setStudentID(newStudentIdentity){
  console.log('ac_setStudentID fired from action creator index and here is the teacherID being passed in as the argument ', newStudentIdentity)
  return {
    type: SET_STUDENT_ID,
    payload: newStudentIdentity
  }
}

export function ac_setCurrentQuiz(currentQuiz){
  console.log('ac_setCurrentQuiz fired from action creator index and here is the currentQuiz being passed in as the argument ', currentQuiz)

  const { current_quiz_id, quiz_id, question, false_1, false_2, false_3, broadcast_id, correct_answer } = currentQuiz

  let falsey1 = {text: false_1, key_val: "false_1"};
  let falsey2 = {text: false_2, key_val: "false_2"};
  let falsey3 = {text: false_3, key_val: "false_3"};

  let randomAnswerArray = [falsey1,falsey2,falsey3]
  // let randomAnswerArray = [{text: false_1, key_val: "false_1"},{text: false_2, key_val: "false_2"},{text: false_3, key_val: "false_3"}]

  console.log("randomAnswerArray is" ,randomAnswerArray)
  let correctItem = {text: correct_answer, key_val: "correct_answer"};
   console.log("correctItem is" ,correctItem)
   let indexOfCorrect = _.random(0,2);
   console.log("indexOfCorrect is" ,indexOfCorrect)
   randomAnswerArray.splice(indexOfCorrect,0,correctItem)
   console.log(randomAnswerArray)
   const finalArray = [...randomAnswerArray]
  
  let currentQuizWithRandomAnswers = Object.assign({},currentQuiz, {answerButtons: finalArray})

  return {
    type: SET_CURRENT_QUIZ,
    payload: currentQuizWithRandomAnswers
  }
}