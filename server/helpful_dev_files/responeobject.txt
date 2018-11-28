DB is connected
[nodemon] restarting due to changes...
[nodemon] starting `node server/index.js`
Server listening on port 3005.
DB is connected
[nodemon] restarting due to changes...
[nodemon] starting `node server/index.js`
Server listening on port 3005.
DB is connected
[nodemon] restarting due to changes...
[nodemon] starting `node server/index.js`
Server listening on port 3005.
DB is connected
here is the req.body inside controller createStack {}
here is the req.body inside controller createStack {}
here is the req.body inside controller createStack {}
here is the req.body inside controller createStack {}
here is the req.body inside controller createStack {}
here is the req.body inside controller createStack {}
here is the req.body inside controller createStack {}
here is the req.body inside controller createStack {}
^A
pcdav@LAPTOP-CSK079CT MINGW64 ~/Desktop/WebDev/show-of-hands-sun-night (change-from-objects-to-arrays)
$ rs
bash: rs: command not found

pcdav@LAPTOP-CSK079CT MINGW64 ~/Desktop/WebDev/show-of-hands-sun-night (change-from-objects-to-arrays)
$ rs
bash: rs: command not found

pcdav@LAPTOP-CSK079CT MINGW64 ~/Desktop/WebDev/show-of-hands-sun-night (change-from-objects-to-arrays)
$ nodemon --watch server
[nodemon] 1.14.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\server/**/*
[nodemon] starting `node server/index.js`
Server listening on port 3005.
DB is connected
Here is the profile object from google auth0 process --------------------------- Profile {
  displayName: 'Paul Davis',
  id: 'google-oauth2|108787943631662510113',
  user_id: 'google-oauth2|108787943631662510113',
  name: { familyName: 'Davis', givenName: 'Paul' },
  picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
  locale: 'en',
  nickname: 'pcdavis12',
  gender: 'male',
  _json:
   { sub: 'google-oauth2|108787943631662510113',
     given_name: 'Paul',
     family_name: 'Davis',
     nickname: 'pcdavis12',
     name: 'Paul Davis',
     picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
     gender: 'male',
     locale: 'en',
     updated_at: '2018-02-20T03:36:34.370Z' },
  _raw: '{"sub":"google-oauth2|108787943631662510113","given_name":"Paul","family_name":"Davis","nickname":"pcdavis12","name":"Paul Davis","picture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg","gender":"male","locale":"en","updated_at":"2018-02-20T03:36:34.370Z"}' }
passport new Auth0Strategy receiving results from Auth0 profile._json. The sub is going to be used next in sq_find_user. Here is the sub:  google-oauth2|108787943631662510113
Still in original passport call. After sq_find_user is made, we're now in the .then with the response from sq_find_user.Here is the response from sq_find_user [ anonymous {
    user_id: 2,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' },
  anonymous {
    user_id: 3,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' },
  anonymous {
    user_id: 4,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' },
  anonymous {
    user_id: 5,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' } ]
in the serializeUser here
true
here is session.user I created inside serializeUser.  { id: 2, stacks: {}, answers: {} }
here is the response that comes into .then from sq_find_logged_in_user. response[0] is sent to done  [ anonymous {
    user_id: 2,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' } ]
 REC TESTING ----------------------------------------------------------------------------------   anonymous {
  user_id: 2,
  user_name: '',
  isteacher: null,
  isstudent: null,
  permissions_level: 1,
  first_name: '',
  last_name: '',
  screen_name: '',
  img: '',
  auth_id: 'google-oauth2|108787943631662510113' }
2
fetchStacks worked [ anonymous {
    quiz_id: 3,
    user_id: 2,
    question: 'What is the capital of New York?',
    correct_answer: 'Albany',
    false_1: 'Buffalo',
    false_2: 'Syracuse',
    false_3: 'New York City',
    content_id: 3,
    ordinal_val: null,
    stack_id: 1,
    stack_title: 'State Capitals' },
  anonymous {
    quiz_id: 2,
    user_id: 2,
    question: 'What is the capital of California?',
    correct_answer: 'Sacramento',
    false_1: 'Napa Valley',
    false_2: 'San Francisco',
    false_3: 'Bakersfield',
    content_id: 2,
    ordinal_val: null,
    stack_id: 1,
    stack_title: 'State Capitals' },
  anonymous {
    quiz_id: 1,
    user_id: 2,
    question: 'What is the capital of Virginia?',
    correct_answer: 'Richmond',
    false_1: 'Petersburg',
    false_2: 'Williamsburg',
    false_3: 'Fredericksburg',
    content_id: 1,
    ordinal_val: null,
    stack_id: 1,
    stack_title: 'State Capitals' },
  anonymous {
    quiz_id: 46,
    user_id: 2,
    question: 'What color is a pumpkin?',
    correct_answer: 'Orange',
    false_1: 'Blue',
    false_2: 'Red',
    false_3: 'Brown',
    content_id: 42,
    ordinal_val: null,
    stack_id: 39,
    stack_title: 'What color is it?' },
  anonymous {
    quiz_id: 45,
    user_id: 2,
    question: 'What color is an apple?',
    correct_answer: 'Red',
    false_1: 'Blue',
    false_2: 'Orange',
    false_3: 'Brown',
    content_id: 41,
    ordinal_val: null,
    stack_id: 39,
    stack_title: 'What color is it?' } ]
here is the response that comes into .then from sq_find_logged_in_user. response[0] is sent to done  [ anonymous {
    user_id: 2,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' } ]
 REC TESTING ----------------------------------------------------------------------------------   anonymous {
  user_id: 2,
  user_name: '',
  isteacher: null,
  isstudent: null,
  permissions_level: 1,
  first_name: '',
  last_name: '',
  screen_name: '',
  img: '',
  auth_id: 'google-oauth2|108787943631662510113' }
2
fetchStackTitles worked [ anonymous { stack_id: 1, stack_title: 'State Capitals', user_id: 2 },
  anonymous { stack_id: 2, stack_title: 'Math questions', user_id: 2 },
  anonymous { stack_id: 3, stack_title: 'Science Quiz', user_id: 2 },
  anonymous { stack_id: 39, stack_title: 'What color is it?', user_id: 2 },
  anonymous { stack_id: 40, stack_title: null, user_id: 2 },
  anonymous { stack_id: 41, stack_title: null, user_id: 2 },
  anonymous { stack_id: 42, stack_title: 'hello', user_id: 2 },
  anonymous { stack_id: 43, stack_title: 'Animals', user_id: 2 },
  anonymous { stack_id: 44, stack_title: 'Famous People', user_id: 2 },
  anonymous { stack_id: 45, stack_title: 'French Vocab', user_id: 2 },
  anonymous { stack_id: 46, stack_title: 'German Vocab', user_id: 2 },
  anonymous { stack_id: 47, stack_title: 'Spanish Vocab', user_id: 2 },
  anonymous { stack_id: 48, stack_title: 'Italian Vocab', user_id: 2 },
  anonymous { stack_id: 49, stack_title: 'Spanish Grammar', user_id: 2 },
  anonymous { stack_id: 50, stack_title: 'Italian Grammar', user_id: 2 },
  anonymous { stack_id: 51, stack_title: 'German Grammar', user_id: 2 } ]
here is the response that comes into .then from sq_find_logged_in_user. response[0] is sent to done  [ anonymous {
    user_id: 2,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' } ]
 REC TESTING ----------------------------------------------------------------------------------   anonymous {
  user_id: 2,
  user_name: '',
  isteacher: null,
  isstudent: null,
  permissions_level: 1,
  first_name: '',
  last_name: '',
  screen_name: '',
  img: '',
  auth_id: 'google-oauth2|108787943631662510113' }
2
here is the response that comes into .then from sq_find_logged_in_user. response[0] is sent to done  [ anonymous {
    user_id: 2,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' } ]
 REC TESTING ----------------------------------------------------------------------------------   anonymous {
  user_id: 2,
  user_name: '',
  isteacher: null,
  isstudent: null,
  permissions_level: 1,
  first_name: '',
  last_name: '',
  screen_name: '',
  img: '',
  auth_id: 'google-oauth2|108787943631662510113' }
2
fetchStacks worked [ anonymous {
    quiz_id: 3,
    user_id: 2,
    question: 'What is the capital of New York?',
    correct_answer: 'Albany',
    false_1: 'Buffalo',
    false_2: 'Syracuse',
    false_3: 'New York City',
    content_id: 3,
    ordinal_val: null,
    stack_id: 1,
    stack_title: 'State Capitals' },
  anonymous {
    quiz_id: 2,
    user_id: 2,
    question: 'What is the capital of California?',
    correct_answer: 'Sacramento',
    false_1: 'Napa Valley',
    false_2: 'San Francisco',
    false_3: 'Bakersfield',
    content_id: 2,
    ordinal_val: null,
    stack_id: 1,
    stack_title: 'State Capitals' },
  anonymous {
    quiz_id: 1,
    user_id: 2,
    question: 'What is the capital of Virginia?',
    correct_answer: 'Richmond',
    false_1: 'Petersburg',
    false_2: 'Williamsburg',
    false_3: 'Fredericksburg',
    content_id: 1,
    ordinal_val: null,
    stack_id: 1,
    stack_title: 'State Capitals' },
  anonymous {
    quiz_id: 46,
    user_id: 2,
    question: 'What color is a pumpkin?',
    correct_answer: 'Orange',
    false_1: 'Blue',
    false_2: 'Red',
    false_3: 'Brown',
    content_id: 42,
    ordinal_val: null,
    stack_id: 39,
    stack_title: 'What color is it?' },
  anonymous {
    quiz_id: 45,
    user_id: 2,
    question: 'What color is an apple?',
    correct_answer: 'Red',
    false_1: 'Blue',
    false_2: 'Orange',
    false_3: 'Brown',
    content_id: 41,
    ordinal_val: null,
    stack_id: 39,
    stack_title: 'What color is it?' } ]
fetchStackTitles worked [ anonymous { stack_id: 1, stack_title: 'State Capitals', user_id: 2 },
  anonymous { stack_id: 2, stack_title: 'Math questions', user_id: 2 },
  anonymous { stack_id: 3, stack_title: 'Science Quiz', user_id: 2 },
  anonymous { stack_id: 39, stack_title: 'What color is it?', user_id: 2 },
  anonymous { stack_id: 40, stack_title: null, user_id: 2 },
  anonymous { stack_id: 41, stack_title: null, user_id: 2 },
  anonymous { stack_id: 42, stack_title: 'hello', user_id: 2 },
  anonymous { stack_id: 43, stack_title: 'Animals', user_id: 2 },
  anonymous { stack_id: 44, stack_title: 'Famous People', user_id: 2 },
  anonymous { stack_id: 45, stack_title: 'French Vocab', user_id: 2 },
  anonymous { stack_id: 46, stack_title: 'German Vocab', user_id: 2 },
  anonymous { stack_id: 47, stack_title: 'Spanish Vocab', user_id: 2 },
  anonymous { stack_id: 48, stack_title: 'Italian Vocab', user_id: 2 },
  anonymous { stack_id: 49, stack_title: 'Spanish Grammar', user_id: 2 },
  anonymous { stack_id: 50, stack_title: 'Italian Grammar', user_id: 2 },
  anonymous { stack_id: 51, stack_title: 'German Grammar', user_id: 2 } ]
here is the response that comes into .then from sq_find_logged_in_user. response[0] is sent to done  [ anonymous {
    user_id: 2,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' } ]
here is the req.body inside controller createStack { broadcastObj: { broadcast_code: 'rrr', user_id: 2, stack_id: 1 } }
here is the broadcast_code from inside create stack controller rrr
here is the stack_id from inside create stack controller 1
here is the user id from inside create stack controller 2
create stack worked [ anonymous {
    broadcast_id: 14,
    user_id: 2,
    stack_id: 1,
    broadcast_code: 'rrr',
    broadcast_start_time: null,
    broadcast_end_time: null } ]
here is the response that comes into .then from sq_find_logged_in_user. response[0] is sent to done  [ anonymous {
    user_id: 2,
    user_name: '',
    isteacher: null,
    isstudent: null,
    permissions_level: 1,
    first_name: '',
    last_name: '',
    screen_name: '',
    img: '',
    auth_id: 'google-oauth2|108787943631662510113' } ]
here is the req.body inside controller createStack {}
TypeError: Cannot read property 'broadcast_code' of undefined
    at createBroadcast (c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\server\controllers\api_controllers.js:71:46)
    at Layer.handle [as handle_request] (c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\layer.js:95:5)
    at next (c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\route.js:137:13)
    at Route.dispatch (c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\route.js:112:3)
    at Layer.handle [as handle_request] (c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\layer.js:95:5)
    at c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\index.js:281:22
    at Function.process_params (c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\index.js:335:12)
    at next (c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\index.js:275:10)
    at SessionStrategy.strategy.pass (c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\passport\lib\middleware\authenticate.js:338:9)
    at c:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\passport\lib\strategies\session.js:69:12
