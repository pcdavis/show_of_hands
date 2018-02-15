import axios from "axios";

export const FETCH_STACKS = "fetch_stacks";
export const FETCH_STACK = "fetch_stack";
export const CREATE_STACK = "create_stack";
export const DELETE_STACK = "delete_stack";

export function fetchStacks() {
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
dsjflkjsdfj

 

 export function createStack(title){
  console.log('createStack actino crreator fired')
  axios.post('/api/newstack', title)
  .catch(error => console.log(error));

  return {
    type: CREATE_STACK,
    payload: "hello from createStack"
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