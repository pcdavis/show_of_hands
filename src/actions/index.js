import axios from "axios";

export const FETCH_STACKS = "fetch_stacks";
export const FETCH_STACK = "fetch_stack";
export const CREATE_STACK = "create_stack";
export const DELETE_STACK = "delete_stack";
export const FETCH_STACK_TITLES = "FETCH_STACK_TITLES";

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


 

 export function createStack(title){
  console.log('createStack actino crreator fired and here is the title being passed to axios as its body object ', title)
  axios.post('/api/newstack', title)
  .catch(error => console.log(error));

  return {
    type: CREATE_STACK,
    payload: {}
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
}