import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import reducers from "./ducks";
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Stack from './components/Stack/Stack'
import SocketRoom from './components/Classroom/SocketRoom'
// import SocketRoom2 from './components/Classroom/SocketRoom2'
import Test from './Test'

const socket = io.connect('http://localhost:3005');
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
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
</Provider>
, document.getElementById('root'));
// registerServiceWorker();
