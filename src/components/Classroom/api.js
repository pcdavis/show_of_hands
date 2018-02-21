import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3005');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };

function messenger(cb) {
  socket.emit('clientMessage');
  socket.on('serverMessage', (serverResponse) => cb(null, serverResponse));
}
export { messenger };

//WED TEST---------------------------------
// function expressDB(cb) {
//   socket.emit('client-exp-update',obj);
//   socket.on('server-exp-update', (serverResponse) => cb(null, serverResponse));
// }
// export { expressDB };