import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import { SocketProvider } from 'socket.io-react';
import io from "socket.io-client"

import reducers from "./ducks";
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Stack from './components/Stack/Stack'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const socket = io.connect('http://localhost:3005')

ReactDOM.render(
      <SocketProvider socket ={socket} >
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter> 
              <div>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/stacks/:id" component={Stack} />
                </Switch>
              </div>
          </BrowserRouter>
        </Provider>
      </SocketProvider>,
document.getElementById('root'));



