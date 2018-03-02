body:
   { responseObj:
      { selectedAnswer: 'correct_answer',
        selectedAnswerText: 'Orange',
        response_timestamp: '2018-02-24T20:06:16.165Z',
        broadcast_id: null,
        screen_name: '',
        user_session_id: '',
        user_id: '',
        quiz_id: 46,
        question: 'What color is a pumpkin?',
        correct_answer: 'Orange' } },
  _body: true,
  length: undefined,
  read: [Function],
  _parsedOriginalUrl:
   Url {
     protocol: null,
     slashes: null,
     auth: null,
     host: null,
     port: null,
     hostname: null,
     hash: null,
     search: null,
     query: null,
     pathname: '/api/postSelection',
     path: '/api/postSelection',
     href: '/api/postSelection',
     _raw: '/api/postSelection' },
  sessionStore:
   MemoryStore {
     domain: null,
     _events:
      { disconnect: [Function: ondisconnect],
        connect: [Function: onconnect] },
     _eventsCount: 2,
     _maxListeners: undefined,
     sessions: { '43f55lZjrYJ53tBXvmVLYWLa91ym07MO': '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}' },
     generate: [Function] },
  sessionID: 'yX4INHy5SaCLvQZ-Tm2-oEOaoQGTKV_s',
  session:
   Session {
     cookie:
      { path: '/',
        _expires: null,
        originalMaxAge: null,
        httpOnly: true } },
  _passport:
   { instance:
      Authenticator {
        _key: 'passport',
        _strategies: [Object],
        _serializers: [Object],
        _deserializers: [Object],
        _infoTransformers: [],
        _framework: [Object],
        _userProperty: 'user',
        _sm: [Object],
        Authenticator: [Function: Authenticator],
        Passport: [Function: Authenticator],
        Strategy: [Object],
        strategies: [Object] } },
  route:
   Route {
     path: '/api/postSelection',
     stack: [ [Object] ],
     methods: { post: true } } }
ReferenceError: req is not defined
    at postAnswer (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\server\controllers\api_controllers.js:179:34)
    at Layer.handle [as handle_request] (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\route.js:137:13)
    at Route.dispatch (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\route.js:112:3)
    at Layer.handle [as handle_request] (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\layer.js:95:5)
    at C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\index.js:281:22
    at Function.process_params (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\index.js:335:12)
    at next (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\express\lib\router\index.js:275:10)
    at SessionStrategy.strategy.pass (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\passport\lib\middleware\authenticate.js:338:9)
    at SessionStrategy.authenticate (C:\Users\pcdav\Desktop\WebDev\show-of-hands-sun-night\node_modules\passport\lib\strategies\session.js:75:10)
[nodemon] restarting due to changes...