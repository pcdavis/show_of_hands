// const current_user_id = session.user.id;

module.exports = {

    fetchStacks: function(req, res, next) {

        console.log(" REC TESTING ----------------------------------------------------------------------------------  ", req.user)
        const db = req.app.get('db');
        if(req.user){
            const user_id = req.user.user_id;
            console.log(user_id)
            db.sq_fetch_stacks([user_id])
            .then( stacks => {
                res.status(200).send( stacks )
                console.log("fetchStacks worked",stacks)
            }) 
            .catch( err => {res.status(500).send('error with fetchStacks') })
        } else {
            res.status(401).send("not authorized")
        }
    },

    fetchStackTitles: function(req, res, next) {

        console.log(" REC TESTING ----------------------------------------------------------------------------------  ", req.user)
        const db = req.app.get('db');
        if(req.user){
            const user_id = req.user.user_id;
            console.log(user_id)
            db.sq_fetch_stackTitles([user_id])
            .then( stacks => {
                res.status(200).send( stacks )
                console.log("fetchStackTitles worked",stacks)
            }) 
            .catch( err => {res.status(500).send('error with fetchStackTitles') })
        } else {
            res.status(401).send("not authorized")
        }
    },

    fetchStackItems: function(req, res, next) {
        const db = req.app.get('db');
        const stackItemsNeeded = req.query.q_stack_id
        db.sq_stack_items([stackItemsNeeded])
    },

    createStack: function(req, res, next) {
        console.log("here is the req.body inside controller createStack", req.body)
        const db = req.app.get('db');
        if(req.user){
            const stack_title = req.body.title
            const user_id = req.user.user_id;
            console.log("here is the user id from inside create stack controller", user_id)
            db.sq_create_stack([stack_title,user_id])
            .then( response => {
                res.status(200).send( response )
                console.log("create stack worked",response)
            }) 
            .catch( err => {res.status(500).send('error with create stack') })
        } 
        else {
            res.status(401).send("not authorized")
        }
    },

    createBroadcast: function(req, res, next) {
        console.log("here is the req.body inside controller createBroadcast", req.body)
        const db = req.app.get('db');
        if(req.user){
            const broadcastObj = req.body.broadcastObj;
            let broadcast_code = broadcastObj.broadcast_code;
            let stack_id = broadcastObj.stack_id;
            const user_id = req.user.user_id;
            console.log("here is the broadcast_code from inside createBroadcast controller", broadcast_code)
            console.log("here is the stack_id from inside createBroadcast controller", stack_id)
            console.log("here is the user id from inside createBroadcast controller", user_id)
            db.sq_createBroadcast([user_id,stack_id,broadcast_code])
            .then( response => {
                res.status(200).send( response[0] )
                console.log("createBroadcast worked",response[0])
            }) 
            .catch( err => {res.status(500).send('error with createBroadcast') })
        } 
        else {
            res.status(401).send("not authorized")
        }
    },

    fetchBroadcast: function(req, res, next) {

        console.log(" fetchBroadcast ----------------------------------------------------------------------------------  ", req.user)
        const db = req.app.get('db');
        if(req.user){
            const user_id = req.user.user_id;
            const broadcast_id = req.body.broadcast_id;
            console.log(user_id)
            db.sq_fetch_broadcast([broadcast_id])
            .then( response => {
                res.status(200).send( response )
                console.log("fetchBroadcast worked",response)
            }) 
            .catch( err => {res.status(500).send('error with fetchBroadcast') })
        } else {
            res.status(401).send("not authorized")
        }
    },

    deleteStack: function(req, res, next) {

        console.log(" deleteStack ----------------------------------------------------------------------------------  ", req.params)
        const db = req.app.get('db');
        if(req.user){
            const user_id = req.user.user_id;
            const stackID = req.params.stackID;
            console.log("stack id ", stackID)
            db.sq_delete_stack([stackID])
            .then( response => {
                res.status(200).send( response )
                console.log("deleteStack worked",response)
            }) 
            .catch( err => {res.status(500).send('error with deleteStack') })
        } else {
            res.status(401).send("not authorized")
        }
    },

    //---------WED TEST OF DIRECT AXIOS POST FROM STUDENT

    
    responseUpdater: function(req, res, next) {

        console.log(" responseUpdater fired in the controller here is the req.user----------------------------------------------------------------------------------  ", req.user)
        console.log(" here is req.sessionID----------------------------------------------------------------------------------  ", req.sessionID)
        const db = req.app.get('db');
        const userSessionID = req.sessionID;
        
        const myResponse = req.body.myResponse;
        console.log(myResponse)
            db.sq_fetch_broadcast([2])
            .then( response => {
                res.status(200).send( myResponse )
                console.log("myResponse worked",response[0])
            }) 
            .catch( err => {res.status(500).send('error with myResponse') })

   },
    //postQuiz is called from TeacherView - it sends the new quiz question to the db, then responds to front end with db response, which will get sent to AC to update redux and finally, TeacherView will then send api_socket method call to notify everyone of the new quiz and emit that object to them to use in Student View
    postQuiz: function(req, res, next) {

        console.log(" postQuiz fired in the controller here is the req.user----------------------------------------------------------------------------------  ", req.user)
        console.log(" here is req.sessionID----------------------------------------------------------------------------------  ", req.sessionID)
        const db = req.app.get('db');
        const userSessionID = req.sessionID;
        
        const quizObj = req.body.newQuiz;
        console.log(quizObj)
        let quiz_id = quizObj.quiz_id;
        let question= quizObj.question;
        let correct_answer = quizObj.correct_answer;
        let false_1 =quizObj.false_1;
        let false_2 =quizObj.false_2;
        let false_3 =quizObj.false_3; 
        let broadcast_id = quizObj.broadcast_id;        
            db.sq_current_quiz([quiz_id, question, correct_answer, false_1, false_2, false_3, broadcast_id ])
            .then( response => {
                res.status(200).send( response[0] )
                console.log("postQuiz worked after being called by TeacherView to post the current Quiz. Here is the response from the db that will be used by front end to update redux and also to emit via socket to all students",response[0])
            }) 
            .catch( err => {res.status(500).send('error with postQuiz when teacher view tried to send the new quiz question to server and db') })

   },
//    postAnswer: function(app, io, responseObj)  
   postAnswer: function(req, res, next) {
       //TODO if I'm not able to bring req and app in as arguments, just ditch the req and make students provide a screenname when entering classroom.  ALSO - you can tag a console.log on the new quiz controller method to see if it receicves a req object even though it is bringing in the app and io in as arguments.

        console.log(" postAnser fired in the controller here is the req----------------------------------------------------------------------------------  ")
        // console.log(" here is app----------------------------------------------------------------------------------  ", app)

        const db = req.app.get('db');
        // console.log(db)
        const userSessionID = req.app.sessionID;
        // const db = app.get('db');
        // db.sq_fetch_current_quiz([1])
        
        console.log("responseObj coming in to postAnswer server controller from front end" , req.body.responseObj)
        let { selectedAnswer, selectedAnswerText, response_timestamp, broadcast_id, screen_name, user_id, stack_id, quiz_id, question, correct_answer } = req.body.responseObj;
        console.log("here is the variable selectedAnswer", selectedAnswer)
        // let database_submission = {
        //     userSessionID,
        //     selectedAnswer,
        //     selectedAnswerText,
        //     response_timestamp,
        //     broadcast_id,
        //     screen_name,
        //     user_id,
        //     stack_id,
        //     quiz_id,
        //     question,
        //     correct_answer
        // }
// console.log("here's the database_submission that is being sent to db_responses-----------", database_submission)  
           
            // db.sq_post_responses(['slppdfjdfj','inserver','selected text from server',234567800944567, 'daffy 2duck3', 1 ])
             db.sq_post_responses([userSessionID, selectedAnswer, selectedAnswerText, response_timestamp, screen_name, quiz_id ])
             .then( response => {
                 console.log("postAnswer receied this back from db after posting the student's response",response[0])
                res.status(200).send( response[0] )
                console.log("postAnswer worked",response)
            }) 
            .catch( err => {res.status(500).send('error with postAnswer') })

   },

    //------------Socket Methods ------------------------------
    messenger: function() {

        console.log(" messageTest fired in the controller ----------------------------------------------------------------------------------  ")
        const db = req.app.get('db');
        
            db.sq_fetch_broadcast([2])
            .then( response => {
                res.status(200).send( response[0] )
                console.log("messageTest worked",response[0])
            }) 
            .catch( err => {res.status(500).send('error with messageTest') })
       
    },
    
    socketMessenger: function(io,app) {
    console.log(" socketMessenger fired in the controller ----------------------------------------------------------------------------------  ")
        const db = app.get('db');
        db.sq_fetch_broadcast([2])
            .then( response => {
                io.emit('serverMessage', response[0])
            }) 
            .catch( err => {res.status(500).send('error with messageTest') })
    },
    
    quizMessenger: function(io,app,current_quiz_id) {
    console.log(" quizMessenger fired in the controller -------------------------------------------------------------------current_quiz_id passed in is ---------------  ",current_quiz_id)
        const db = app.get('db');
        db.sq_fetch_current_quiz([current_quiz_id])
            .then( response => {
                io.emit('new_quiz_question', response[0])
            }) 
            .catch( err => {res.status(500).send('error with messageTest') })
    },
    
    //This may have been used as a test or maybe I used it to send the quiz to everyone. Not sure anymore
    // postAnswer: function(io,app,current_quiz_id) {
    // console.log(" postAnswer fired in the controller -------------------------------------------------------------------current_quiz_id passed in is ---------------  ",current_quiz_id)
    //     const db = app.get('db');
    //     db.sq_fetch_current_quiz([current_quiz_id])
    //         .then( response => {
    //             io.emit('new_quiz_question', response[0])
    //         }) 
    //         .catch( err => {res.status(500).send('error with messageTest') })
    // },






        // const { session } = req;
            //   console.log(" the createStack controller just fired. Here is the req ", req)
            //   console.log(" REC TESTING ----------------------------------------------------------------------------------  ", req.user)
            //   console.log(" REC TESTING ----------------------------------------------------------------------------------  ", req.body)
            //   console.log(" REC TESTING ----------------------------------------------------------------------------------  ", req.session)
            //   constole.log(req.session)
        // let title = req.body.title;
        // console.log("createStack controller fired")
        // console.log(req.body)
        // const current_user_id = session.user.id;
        // let id = current_user_id;
           
        // const db = req.app.get('db');
        // console.log("this is firing from createStack")
        // console.log('title',newStack.title)
        // console.log('user_id',newStack.user_id)

        // db.sq_create_stack([title, id])
        
    
    // exampleMethod:   ( req, res, next ) {
    //         const { session } = req;
    //           console.log(req.session)
    //           if ( !session.user ) {
    //             session.user = { username: '', cart: [], total: 0.00 };
    //           } 
              
    //           console.log("here's req session after user key created")
    //           console.log(req.session)
    //         next();


    } // end of module exports



// }

// create: (req, res) => {
//     id++;
//     let newSnippet = {
//         id: id,
//         name: req.body.name,
//         title: req.body.title,
//         subtitle: req.body.subtitle,
//         snippetText: req.body.snippetText,
//         tags: req.body.tags,
//         time: new Date()
//     }
//     snippets.push(newSnippet);
//     //console.log(snippets);
//     res.status(200).send( snippets);
// },