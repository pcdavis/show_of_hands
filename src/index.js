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
import QuizQuestion from './components/QuizQuestion/QuizQuestion'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
      <Provider store={createStoreWithMiddleware(reducers)}>
          <BrowserRouter> 
            <div>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/newquestion" component={QuizQuestion} />
                <Route exact path="/stacks/:id" component={Stack} />
              </Switch>
            </div>
        </BrowserRouter>
      </Provider>,
document.getElementById('root'));



