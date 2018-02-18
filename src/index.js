import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";


import reducers from "./ducks";
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Stack from './components/Stack/Stack'
import SocketRoom from './components/Classroom/SocketRoom'
// import SocketRoom2 from './components/Classroom/SocketRoom2'
import Test from './Test'

//socket.io-redux middleware additions ------------------------
import io from 'socket.io-client';
import socketIO from 'socket.io-redux';
const socketStore = createStore(reducers, applyMiddleware(
  socketIO(io.connect(process.env.SOCKET_URL))
));
//socket.io-redux ---------------------------

//Below is the code used to create the provider prior to the socket-io-redux implementation
// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// <Provider store={createStoreWithMiddleware(reducers)}>


ReactDOM.render(
      
        <Provider store={socketStore}>
            <BrowserRouter> 
              <div>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path='/test' component={Test} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/stacks/:id" component={Stack} />
                  <Route exact path="/socketroom" component={SocketRoom} />
                  {/* <Route exact path="/socketroom2" component={SocketRoom2} /> */}
                </Switch>
              </div>
          </BrowserRouter>
        </Provider>,
document.getElementById('root'));



