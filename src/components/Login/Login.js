import React, { Component } from 'react';
import logo from './logo.svg';
import './login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <img src={logo} className="Login-logo" alt="logo" />
          <h1 className="Login-title">Welcome to React</h1>
        </header>
        <p className="Login-intro">
          To get started, edit <code>src/Login.js</code> and save to reload.
        </p>

        <h1>This is the Login component</h1>
                <a href={ process.env.REACT_APP_LOGIN }><button>Login/Register</button></a>

      </div>
    );
  }
}

export default Login;
