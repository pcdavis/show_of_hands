import React from "react";
import ReactDOM from "react-dom";

import App from './components/App/App'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import reducers from "./ducks";


const socket = io.connect('http://localhost:3005');
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter> 
      <App/>
  </BrowserRouter>
</Provider>
, document.getElementById('root'));
// registerServiceWorker();
