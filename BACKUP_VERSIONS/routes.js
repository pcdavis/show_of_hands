import React from 'react';
import {  Route,  Switch } from 'react-router-dom';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'

// import QuizQuestion from './components/QuizQuestion/QuizQuestion'
// import Stack from './components/Stack/Stack'

export default (
<Switch>
    <Route exact path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} />

</Switch>
)
