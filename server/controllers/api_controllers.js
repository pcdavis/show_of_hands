// const current_user_id = session.user.id;

module.exports = {

    fetchStacks: function(req, res, next) {
        const db = req.app.get('db');
        db.sq_fetch_stacks()
        .then( stacks => {
            res.status(200).send( stacks )
            console.log("fetchStacks worked",stacks)
        }) 
        .catch( err => {res.status(500).send('error with fetchStacks') })
    },

    fetchStackItems: function(req, res, next) {
        const db = req.app.get('db');
        const stackItemsNeeded = req.query.q_stack_id
        db.sq_stack_items([stackItemsNeeded])
    },

    createStack: function(req, res, next) {
        // const { session } = req;
              console.log(" the createStack controller just fired. Here is the req ", req)
              console.log(" REC TESTING ----------------------------------------------------------------------------------  ", req.user)
              console.log(" REC TESTING ----------------------------------------------------------------------------------  ", req.body)
              console.log(" REC TESTING ----------------------------------------------------------------------------------  ", req.session)
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
        }
    
    // exampleMethod:   ( req, res, next ) {
    //         const { session } = req;
    //           console.log(req.session)
    //           if ( !session.user ) {
    //             session.user = { username: '', cart: [], total: 0.00 };
    //           } 
              
    //           console.log("here's req session after user key created")
    //           console.log(req.session)
    //         next();
    }



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