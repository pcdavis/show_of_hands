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
    let broadcast_id = this.props.match.params.id //Note: this only works because I added a prop to the rendered version of teacherview component inside the classroom component. Otherwise Route would not have given the teacherview component access to it.
    this.props.fetchBroadcast(broadcast_id)
    console.log("here are socket props in cdm in teacherview-----------------------",this.props.socketroom)
    console.log(this.state.isTeacher)
}

//Here is what the_broadcast_stack looks like: It's an array of objects.
// (3) [{…}, {…}, {…}]
// 0
// :
// {quiz_id: 3, user_id: 2, question: "What is the capital of New York?", correct_answer: "Albany", false_1: "Buffalo", …}
// 1
// :
// {quiz_id: 2, user_id: 2, question: "What is the capital of California?", correct_answer: "Sacramento", false_1: "Napa Valley", …}
// 2
// :
// {quiz_id: 1, user_id: 2, question: "What is the capital of Virginia?", correct_answer: "Richmond", false_1: "Petersburg", …}
// length
// :
// 3


renderStackItems() {
  let the_broadcast_stack = this.props.socketroom.broadcast_stack;
  console.log(the_broadcast_stack)

  return  _.map(the_broadcast_stack, quizObj => {
    console.log(quizObj)
    let index = quizObj.content_id;

    return (
      
     <div>
        <Panel.Body key={quizObj.quiz_id} > {quizObj.question} <Button onClick={() => console.log("start broadcast")}>Start</Button></Panel.Body>
          <ListGroupItem  > {quizObj.corect_answer} </ListGroupItem>
          <ListGroupItem  > {quizObj.false_1} </ListGroupItem>
          <ListGroupItem  > {quizObj.false_2} </ListGroupItem>
          <ListGroupItem  > {quizObj.false_3} </ListGroupItem>
        
     </div>
      );
      
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