import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3005');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };

function api_subscribe_to_quizes(cb) {
  socket.on('new_quiz_question', (newQuizObj) => {
    console.log(newQuizObj)
    cb(null, newQuizObj)
  }  );
}
// function api_subscribe_to_quizes(cb) {
//   socket.on('new_quiz_question', current_quiz_id => cb(null, current_quiz_id) );
// }
export { api_subscribe_to_quizes };

function messenger(cb) {
  socket.emit('clientMessage');
  socket.on('serverMessage', (serverResponse) => cb(null, serverResponse));
}
export { messenger };

function api_broadcast_quiz(current_quiz_id) {
  socket.emit('update_quiz_view', current_quiz_id);
  // socket.on('serverMessage', (serverResponse) => cb(null, serverResponse));
}
export { api_broadcast_quiz };


//WED TEST---------------------------------
// function expressDB(cb) {
//   socket.emit('client-exp-update',obj);
//   socket.on('server-exp-update', (serverResponse) => cb(null, serverResponse));
// }
// export { expressDB };