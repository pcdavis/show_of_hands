import _ from "lodash";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import axios from 'axios';
import { subscribeToTimer, messenger } from './api';
import { Form, FormControl, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import {fetchBroadcast } from '../../actions/index';

class TeacherView extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
    this.state = {
      timestamp: 'no timestamp yet',
      message: '',
      broadcast_code: '',
        exp_obj: {
          quiz_id: 1,
          question: "Is this the teacher?"
        }
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount(){
    let broadcast_id = this.props.match.params.id
    this.props.fetchBroadcast(broadcast_id)
    console.log("here are socket props in cdm in teacherview-----------------------",this.props.socketroom)
    console.log(this.state.isTeacher)
}

renderStackItems() {
  let the_broadcast_stack = this.props.socketroom.broadcast_stack;
  console.log(the_broadcast_stack)

  return  _.map(the_broadcast_stack, quizObj => {
    console.log(quizObj)
    let index = quizObj.content_id;
    // console.log('inside render stacks in dashboard. here is quizObj.content_id that I assign as the key to each link created',index)
    // console.log('here is the quizObj object that is going through the lodash map inside render stacks', quizObj)
      
        return (<ListGroupItem  key={quizObj.quiz_id}> {quizObj.question} </ListGroupItem>);
      
  });
}

  sendMessage(){
    console.log('sendmessage fired')
  //   let msg = this.state.message
  messenger((err, serverResponse) => {
      console.log(serverResponse)
      // let broadcastObj = {
      //     broadcast_id: serverResponse.broadcast_id,
      //     broadcast_code: serverResponse.broadcast_code
      // }
      // this.setState({
      //     broadcast_code: broadcastObj.broadcast_code
      // })
  })
}
//TEST Axios post direct to server.then response to AC - then socket emit
sendMySelection(){
let myResponse = this.state.exp_obj;
console.log(myResponse)
axios.post('/api/studentresponses',{myResponse})
.then( (response) => {
  console.log("here is the response from sendMySelection-----------" ,response)
})
}

  render() {


    return (
      <div className="TeacherView">
      <h1>Welcome to the Teacher View </h1>

      <Panel>
          <Panel.Heading><h2>{this.state.theStackTitle}</h2></Panel.Heading>
          <ListGroup>
            {this.props.socketroom && this.renderStackItems()}
          </ListGroup>
          <Panel.Body> <Button onClick={() => console.log("start broadcast")}>New Quiz Question</Button></Panel.Body>
        </Panel>;
        
                    
                    <h1>This is the timer value: {this.state.timestamp} </h1> 
                    <h2>{this.props.socketroom.broadcast_code}</h2> 
                    <Form inline>
        <FormControl 
            placeholder = 'Broadcast Code'
            onChange = { event => this.setState({ message: event.target.value})}
            />
        <Button onClick={() => this.sendMySelection()}>Send Message to Studi</Button>
        <h3>{this.state.message}</h3>
        </Form> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    stacks: state.stack_content.stacks,
    teacherID: state.stack_content.teacherID,
    stack_titles: state.stack_content.stackTitles,
    socketroom: state.socketroom
  };
}

export default connect (mapStateToProps, {fetchBroadcast})(TeacherView)