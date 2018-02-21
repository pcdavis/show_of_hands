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
const io = require('socket.io')(server);

var socketCount = 0

io.on('connection', function (client){
    // Socket has connected, increase socket count
    socketCount++
    console.log(socketCount)
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
        control.messenger();
        client.emit('serverMessage', serverResponse)
    })
  });

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

massive(process.env.CONNECTION_STRING).then( dbInstance => {
    app.set('db',dbInstance);
    console.log('DB is connected')
}).catch(console.log);

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
    let user = { id: user_id, stacks: { }, answers: { }};
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


//Start server listening
const port = process.env.SERVER_PORT || 3005

//socket attempt -----------
// io.listen(port);
server.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
//here's the listen call before socket implemented
// app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );


//Below are the sql scripts I used to create the users1 table, populate it with some test records and see if they show up as expected
// CREATE TABLE users1(
//     user_id serial primary key,
//     user_name text,
//     img text,
//     auth_id text,
//     first_name text,
//     last_name text,
//     gender text,
//     hair_color text,
//     eye_color text,
//     hobby text,
//     birth_day integer,
//     birth_month text,
//     birth_year integer
// )


// insert into users1 
// (user_name, img, auth_id, first_name, last_name, gender, hair_color, eye_color, hobby, birth_day, birth_month, birth_year)
// VALUES 
// ('', '', 'google-oauth2|10878794363160113', '', '', '', '', '', '', null, '', null )
// returning *;

// select * from users1;