import React, { Component } from 'react';
import { Form, FormControl, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import axios from 'axios';
import { connect } from 'react-redux';
import {ac_setStudentID } from '../../actions/index';
import { api_notify_classroom } from '../Classroom/api';
import logo from './logo.svg';
import './login.css';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        <img src={logo} className="Login-logo" alt="logo" />
      </div>
    )}
  </Transition>
);

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      classroom_code: '',
      screen_name: '',
      mySessionID: '',
      isEntered: false
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handle_student_signin = this.handle_student_signin.bind(this)
  }

  componentDidMount() {
    this.setState({ isEntered: true })
  }

  handle_student_signin(classCode) {
    let screenName = this.state.screen_name;
    console.log("handle_student_signin fired inside login page / home '/' -------------", classCode)
    console.log("handle_student_signin fired inside screenName -------------", screenName)
    axios.post('/api/students', {screenName})
    .then( response => { 
      console.log("the student's session id that comes from response from server to handle student signin axios submission", response.data)
      let newStudentIdentity = response.data
      // this.setState({ mySessionID: newStudentIdentity.sessionID})
      this.props.ac_setStudentID(newStudentIdentity)
      console.log("the newStudentIdentity", newStudentIdentity)
      api_notify_classroom(newStudentIdentity)
      console.log("the socketroom props inside the login should now be showing", this.props.socketroom)
    })
    this.props.history.push(`/classroom/${this.state.classroom_code}`)
    this.setState({classroom_code: '' })
  }

  render() {
    const { isEntered } = this.state;

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
        <Fade in={ isEntered } />

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

function mapStateToProps(state) {
  return { 
   socketroom: state.socketroom
  };
}


export default connect (mapStateToProps, {ac_setStudentID})(Login)

