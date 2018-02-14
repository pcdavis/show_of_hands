//This version didn't break anything, but didn't seem to resolve any promises
// import { createStore, applyMiddleware } from 'redux';
// import promise from 'redux-promise'
// import reducer from './ducks/reducer_stacks';
// export default createStore(reducer, applyMiddleware(promise));

//below is my attempt to apply middleware the way udemy did
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducer from './ducks/reducer_stacks';

export default applyMiddleware(promise)(createStore)(reducer);


//Below is the example from the Node Middleware shopping cart repo
// import { createStore, applyMiddleware } from 'redux';
// import promiseMiddleWare from 'redux-promise-middleware'
// import reducer from './ducks/reducer_stacks';
// export default createStore(reducer, applyMiddleware(promiseMiddleWare()));



//below is my attempt to apply middleware the way udemy did
// import { createStore, applyMiddleware } from "redux";
// import promise from "redux-promise";
// import reducers from "./ducks";

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// export default createStoreWithMiddleware(reducers)




//Here is how udemy implmented his store:
//NOTE: He used promise, which we didn't
// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// store={createStoreWithMiddleware(reducers)}

//Here's the full code from his root index file
// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import promise from "redux-promise";

// import reducers from "./reducers";
// import PostsIndex from "./components/posts_index";
// import PostsNew from "./components/posts_new";
// import PostsShow from "./components/posts_show";

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <BrowserRouter>
//       <div>
//         <Switch>
//           <Route path="/posts/new" component={PostsNew} />
//           <Route path="/posts/:id" component={PostsShow} />
//           <Route path="/" component={PostsIndex} />
//         </Switch>
//       </div>
//     </BrowserRouter>
//   </Provider>,
//   document.querySelector(".container")
// );
