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
import Classroom from './components/Classroom/Classroom'
import Test from './components/Test/Test'
// import Widgets from './components/coreUI/Widgets/Widgets'

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
                <Route exact path="/classroom/:id" component={Classroom} />
                <Route exact path="/test" component={Test} />
                {/* <Route exact path="/widgets" component={Widgets} /> */}
              </Switch>
            </div>
        </BrowserRouter>
      </Provider>,
document.getElementById('root'));



