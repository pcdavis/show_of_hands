import React, { Component } from 'react';
import { Form, FormControl, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import axios from 'axios';
import logo from './logo.svg';
import './login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      classroom_code: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handle_student_signin = this.handle_student_signin.bind(this)
  }
  handleChange(event){
    this.setState({
      classroom_code: event.target.value,
      screen_name: event.target.value
    })
  }

  handle_student_signin(classCode) {
    let screenName = this.state.screen_name;
    console.log("handle_student_signin fired inside login page / home '/' -------------", classCode)
    console.log("handle_student_signin fired inside screenName -------------", screenName)
    axios.post('api/students', {screenName})
    .then( response => { console.log("the student's session id that comes from response from server to handle student signin axios submission", response)})
    this.props.history.push(`/classroom/${this.state.classroom_code}`)
    // this.setState({classroom_code: '' })
  }

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

        <h1>Welcome to Show of Hands</h1>

      <Form inline>
        <FormControl 
        placeholder = 'Enter Your Classroom Code'
        value = {this.state.classroom_code}
        onChange = { event => this.setState({ classroom_code: event.target.value})}
        />
        <FormControl 
        placeholder = 'Enter a Screen Name'
        value = {this.state.screen_name}
        onChange = { event => this.setState({ screen_name: event.target.value})}
        />
        <Button onClick={ () => this.handle_student_signin(this.state.classroom_code) } >Enter Classroom</Button>
      </Form>

                <a href={ process.env.REACT_APP_LOGIN }>Teacher login</a>

      </div>
    );
  }
}

export default Login;
