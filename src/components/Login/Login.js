import React, { Component } from 'react';
import { Form, FormControl, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import axios from 'axios';
import { connect } from 'react-redux';
import {ac_setStudentID } from '../../actions/index';
import { api_notify_classroom } from '../Classroom/api';
import logo from './logo-hands-purple-login-02-01.svg';
import SOH from './SVG-HEADER.svg';
import './login.css'

import Transition from 'react-transition-group/Transition';

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
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
        <img src={logo} className="animated fadeInUpBig z-bottom logo-move" alt="logo" />
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
    console.log("handle_student_signin fired inside Login page / home '/' -------------", classCode)
    console.log("handle_student_signin fired inside screenName -------------", screenName)
    axios.post('/api/students', {screenName})
    .then( response => {
      console.log("the student's session id that comes from response from server to handle student signin axios submission", response.data)
      let newStudentIdentity = response.data
      // this.setState({ mySessionID: newStudentIdentity.sessionID})
      this.props.ac_setStudentID(newStudentIdentity)
      console.log("the newStudentIdentity", newStudentIdentity)
      api_notify_classroom(newStudentIdentity)
      console.log("the socketroom props inside the Login should now be showing", this.props.socketroom)
    })
    this.props.history.push(`/classroom/${this.state.classroom_code}`)
    this.setState({classroom_code: '' })
  }

  // <div className="soh"><img src={SOH} className="animated fadeIn" alt="logo" /></div>
  render() {
    const { isEntered } = this.state;

    return (
      <div className="Login">




        <div className="login-form-wrapper">
        <Form inline className="login-form">
          <FormControl
          className="login-form-field"
          placeholder = 'Enter Your Classroom Code'
          value = {this.state.classroom_code}
          onChange = { event => this.setState({ classroom_code: event.target.value})}
          />
          <FormControl
          className="login-form-field"
          placeholder = 'Enter a Screen Name'
          value = {this.state.screen_name}
          onChange = { event => this.setState({ screen_name: event.target.value})}
          />
          <Button disabled={!this.state.classroom_code || !this.state.screen_name} className="login-form-button" onClick={ () => this.handle_student_signin(this.state.classroom_code) } >Enter Classroom</Button>
        </Form>


        <div className="teacher-login">
        <a href={ process.env.REACT_APP_LOGIN }>Teacher login</a>
        </div>

        </div>

      <div className="login-footer">
      <Fade in={ isEntered } />
      </div>

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

