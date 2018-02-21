import axios from "axios";

export const FETCH_STACKS = "fetch_stacks";
export const FETCH_STACK = "fetch_stack";
export const CREATE_STACK = "create_stack";
export const DELETE_STACK = "delete_stack";
export const FETCH_STACK_TITLES = "FETCH_STACK_TITLES";
export const CREATE_BROADCAST = "CREATE_BROADCAST";
export const SET_TEACHER_ID = "SET_TEACHER_ID";
export const FETCH_BROADCAST_CONTENT = "FETCH_BROADCAST_CONTENT";

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

 export function deleteStack(stackID, callback){
  console.log('deleteStack action crreator fired and here is the stackID being passed to axios as its body object ', stackID)
  axios.delete('/api/deletestack/'+stackID)
  .then(() => callback())
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
  let serverResponse = axios.post('/api/newbroadcast', {broadcast_id}).then( resp => resp.data)
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