require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Autho0Strategy = require('passport-auth0');
const cors = require('cors');// potentially not necessary
const massive = require('massive'); 
const control = require ('./controllers/api_controllers.js')

//Import Controllers I created that are used in Endpoints
// const swag_controller = require('./controllers/swag_controller');

const app = express(); 

//socket-attempt-medium-dailyjs
// const io = require('socket.io')();
//joe's version
const server = require('http').Server(app);

massive(process.env.CONNECTION_STRING).then( dbInstance => {
    app.set('db',dbInstance);
    console.log('DB is connected')
}).catch(console.log);
const db = app.get('db')
const io = require('socket.io')(server);

var socketCount = 0
//TODO change over from client to socket and create connections array to manage socket connections
// const connections = [];
// io.on('connection', function (socket) {
// 	console.log("Connected to Socket!!"+ socket.id)	
// 	connections.push(socket)
// 	socket.on('disconnect', function(){
// 		console.log('Disconnected - '+ socket.id);
// 	});

io.on('connection', function (client){
    // Socket has connected, increase socket count
    socketCount++
    console.log("Socket Connections: ", socketCount)
    io.emit('users connected', socketCount)
 
    client.on('disconnect', function() {
        // Decrease the socket count on a disconnect, emit
        socketCount--
        io.emit('users connected', socketCount)
    })

    client.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        client.emit('timer', new Date());
      }, interval);
    });

    client.on('clientMessage', () => {
        control.socketMessenger(io, app); //need to pass in io and app in order to be able to use sql calls to db and emit the response
        
    })

    client.on('responses_to_server', (responseObj) => {
        io.emit('new_response', responseObj)
        
    })

    client.on('incoming_students', (newStudentIdentity) => {
        io.emit('new_student', newStudentIdentity)
     })

    client.on('update_quiz_view', (current_quiz_id) => {
        control.quizMessenger(io, app, current_quiz_id)
        // io.emit('new_quiz_question', quizObj);
        
    })

    // client.on('submit_response', (responseObj) => {
    //     control.postAnswer(io, app, responseObj)
                
    // })

    // client.on('update_quiz_view', (current_quiz_id) => {
    //     io.emit('new_quiz_question', current_quiz_id);
        
    // })


  });//end of socket calls

  //What follows is an example from an article http://markshust.com/2013/11/07/creating-nodejs-server-client-socket-io-mysql

//   var socketCount = 0
 
// io.sockets.on('connection', function(socket){
//     // Socket has connected, increase socket count
//     socketCount++
//     // Let all sockets know how many are connected
//     io.sockets.emit('users connected', socketCount)
 
//     socket.on('disconnect', function() {
//         // Decrease the socket count on a disconnect, emit
//         socketCount--
//         io.sockets.emit('users connected', socketCount)
//     })
 
//     socket.on('new note', function(data){
//         // New note added, push to all sockets and insert into db
//         notes.push(data)
//         io.sockets.emit('new note', data)
//         // Use node's db injection format to filter incoming data
//         db.query('INSERT INTO notes (note) VALUES (?)', data.note)
//     })
// // Check to see if initial query/notes are set
// if (! isInitNotes) {
//     // Initial app start, run db query
//     db.query('SELECT * FROM notes')
//         .on('result', function(data){
//             // Push results onto the notes array
//             notes.push(data)
//         })
//         .on('end', function(){
//             // Only emit notes after query has been completed
//             socket.emit('initial notes', notes)
//         })

//     isInitNotes = true
// } else {
//     // Initial notes already exist, send out
//     socket.emit('initial notes', notes)
// }
// })
  
  
//------------------------------------


app.use(bodyParser.json());
// app.use(cors);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Autho0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db');
    console.log("Here is the profile object from google auth0 process ---------------------------" ,profile);
    const { sub } = profile._json; 
    console.log("passport new Auth0Strategy receiving results from Auth0 profile._json. The sub is going to be used next in sq_find_user. Here is the sub: ", sub)
    
    db.sq_find_user([sub])
    .then( response => {
        console.log("Still in original passport call. After sq_find_user is made, we're now in the .then with the response from sq_find_user.Here is the response from sq_find_user", response)
        if (response.length > 0){
            done(null, response[0].user_id)
        } else {
            db.sq_create_user([sub])
            .then( response => { 
                console.log("here is the response from sq_create_user", response);
                done(null, response[0].user_id) })
        }
    })
})); // end of passport.use call

passport.serializeUser( (user_id, done) => { 
    console.log("in the serializeUser here")
    //I am creating the session.user object below
    let user = { id: user_id, stacks: { }, answers: { }, screenName: ''};
    const isuser = user ? true : false;
    console.log(isuser)
    console.log("here is session.user I created inside serializeUser. ", user)
   
    done(null, user);
})

passport.deserializeUser( (user, done) => {
    const db = app.get('db');
    // console.log("this is req.session.user from the deserializer",session.user)
    
    db.sq_find_logged_in_user([user.id])
    .then( response => {
        console.log("here is the response that comes into .then from sq_find_logged_in_user. response[0] is sent to done ", response)
        done(null, response[0]);
    })
})

//Authentication endpoints for Auth0
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', { 
    successRedirect: 'http://localhost:3000/dashboard'
}));

//This endpoint gets called from a componentDidMount - used to ensure that the user is valid before showing sensative data
app.get('/auth/me', (req,res) => {
    if(!req.user){
        res.status(401).send('Sorry, please log in to your account')
    } else {
        res.status(200).send(req.user);
    }
} )
// endpoint for logging out.
app.get( '/logout', (req,res) => {
    req.logOut();  //this kills the auth0 session
    res.redirect('http://localhost:3000/')
} )

//Endpoints for interacting with the regular pages of the app
app.post('/api/newstack', control.createStack)
app.post('/api/newbroadcast', control.createBroadcast)
app.get('/api/stacks', control.fetchStacks)
app.delete('/api/deletestack/:stackID', control.deleteStack)
app.get('/api/stacktitles', control.fetchStackTitles)
app.post('/api/broadcast', control.fetchBroadcast)
app.get('/api/stack_items', control.fetchStackItems)
app.get('/api/topfive', control.fetchTopFive)

//test of direct axios post from student teachers
app.post('/api/studentresponses', control.responseUpdater)
app.post('/api/postQuiz', control.postQuiz)
app.post('/api/responses', control.postAnswer)
app.post('/api/students', control.student_signin)



//Start server listening
const port = process.env.SERVER_PORT || 3005

//socket attempt -----------
// io.listen(port);
server.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
//here's the listen call before socket implemented
// app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );

