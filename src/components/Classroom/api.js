import openSocket from 'socket.io-client';
const  socket = openSocket(process.env.REACT_APP_SERVER);
// const  socket = openSocket('http://localhost:3005');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };

function api_subscribe_to_quizes(cb) {
  socket.on('new_quiz_question', (newQuizObj) => {
    console.log("inside api_subscribe_to_quizes. here is the newQuizObj that arrived from teacher" ,newQuizObj)
    cb(null, newQuizObj)
  }  );
}
export { api_subscribe_to_quizes };

function api_notify_classroom(newStudentIdentity) {
  console.log("here's what came into the api_notify_classroom", newStudentIdentity)
  socket.emit('incoming_students', newStudentIdentity );
}
export { api_notify_classroom };

function api_subscribe_to_new_students(cb) {
  socket.on('new_student', (newStudentIdentity) => {
    console.log(newStudentIdentity)
    cb(null, newStudentIdentity)
  } );
}
export { api_subscribe_to_new_students };

function api_emit_my_responses(myResponse) {
  console.log("here's what came into the api_emit_my_responses", myResponse)
  socket.emit('responses_to_server', myResponse );
}
export { api_emit_my_responses };


function api_subscribe_to_responses(cb) {
  socket.on('new_response', newResponse => cb(null, newResponse));
  // socket.on('serverMessage', (serverResponse) => cb(null, serverResponse));
}
export { api_subscribe_to_responses };


function messenger(cb) {
  socket.emit('clientMessage');
  socket.on('serverMessage', (serverResponse) => cb(null, serverResponse));
}
export { messenger };

//Use api_broadcast_quiz to let teacher send server controller the quiz id and have servercontroller emit the current_quiz to students
function api_broadcast_quiz(current_quiz_id) {
  socket.emit('update_quiz_view', current_quiz_id);
  // socket.on('serverMessage', (serverResponse) => cb(null, serverResponse));
}
export { api_broadcast_quiz };

//Use api_broadcast_topFive to let teacher emit top five students
function api_broadcast_topFive(topFiveNames) {
  console.log("api_broadcast_topFive fired, here are topfie ",topFiveNames )
  socket.emit('send_top_five', topFiveNames);
}
export { api_broadcast_topFive };


function api_subscribe_to_topFive(cb) {
  socket.on('top_five', topFiveNames => cb(null, topFiveNames));
}
export { api_subscribe_to_topFive };



// function api_submit_response(responseObj) {
//   socket.emit('submit_response', responseObj);
//   // socket.on('serverMessage', (serverResponse) => cb(null, serverResponse));
// }
// export { api_submit_response };



//WED TEST---------------------------------
// function expressDB(cb) {
//   socket.emit('client-exp-update',obj);
//   socket.on('server-exp-update', (serverResponse) => cb(null, serverResponse));
// }
// export { expressDB };