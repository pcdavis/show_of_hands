import _ from "lodash";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import axios from 'axios';
import { subscribeToTimer, messenger, api_broadcast_quiz } from './api';
import { Form, FormControl, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import {fetchBroadcast, ac_setCurrentQuiz } from '../../actions/index';

class TeacherView extends Component {
  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
    this.state = {
      timestamp: 'no timestamp yet',
      message: '',
      broadcast_code: '',
        exp_obj: {
          quiz_id: 1,
          question: "Is this the teacher?"
        },
      studentView: {}
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount(){
    console.log("here are socket props in cdm in teacherview-----------------------",this.props.socketroom)
    let broadcast_id = this.props.socketroom.broadcast_id //Note: this only works because I added a prop to the rendered version of teacherview component inside the classroom component. Otherwise Route would not have given the teacherview component access to it.
    this.props.fetchBroadcast(broadcast_id)
   
    
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
  console.log("stack_titles" ,this.props.stack_titles)
  console.log("the_broadcast_stack" ,the_broadcast_stack)

  return  _.map(the_broadcast_stack, quizObj => {
    // console.log(quizObj)
    let index = quizObj.content_id;

    return (
      
     <div key={quizObj.quiz_id}>
        <Panel.Body  > 
        {quizObj.question} 

          <Button onClick={() => this.sendMySelection({
            quiz_id: quizObj.quiz_id,
            question: quizObj.question,
            correct_answer: quizObj.correct_answer,
            false_1:quizObj.false_1,
            false_2:quizObj.false_2,
            false_3:quizObj.false_3,
            broadcast_id: this.props.socketroom.broadcast_id
          })}>Start</Button>

          <Button onClick={() => this.getTopFive()}>End</Button>

        </Panel.Body>
          <ListGroupItem  > {quizObj.correct_answer} </ListGroupItem>
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
sendMySelection(newQuiz){
  let current_quiz_id;

console.log("sendMySelection fired FROM INSIDE TEACHERVIEW AND IS USED TO SEND NEW QUIZ QUESTION VIA axios.post('/api/postQuiz',{newQuiz}) TO STUDENTSand newQuiz obj is " ,newQuiz)
axios.post('/api/postQuiz',{newQuiz})
.then( (response) => {
  console.log("here is the response.data from sendMySelection-----------" ,response.data)
  let currentQuiz = response.data //this is an object with the keys I need
  current_quiz_id = currentQuiz.current_quiz_id
  this.props.ac_setCurrentQuiz(currentQuiz)
  api_broadcast_quiz(current_quiz_id)//place this inside .then otherwise it would fire before .then because .then is async promise
})
setTimeout(  () => {console.log(this.props.socketroom)} , 5000)
// setTimeout(  () => {
//   api_notify_of_quiz(currentQuiz);
// }, 5000)
}

getTopFive(){
let requestObj = {
  broadcast_id: this.props.socketroom.current_quiz.broadcast_id,
  quiz_id: this.props.socketroom.current_quiz.quiz_id
}
// let requestObj = {
//   broadcast_id: this.props.socketroom.current_quiz.broadcast_id,
//   quiz_id: this.props.socketroom.current_quiz.quiz_id
// }
console.log("getTopFive fired FROM INSIDE TEACHERVIEW. Here is the requestObj" ,requestObj)
axios.get(`/api/topfive?broadcast_id=${requestObj.broadcast_id}&quiz_id=${requestObj.quiz_id}`)
.then( (response) => {
  let topFiveNames = []
  console.log("here is the response.data from getTopFive-----------" ,response.data)
  topFiveNames = response.data.map( obj => {
    return obj.screen_name
  })
  console.log(topFiveNames)
  // let currentQuiz = response.data //this is an object with the keys I need
  // current_quiz_id = currentQuiz.current_quiz_id
  // this.props.ac_setCurrentQuiz(currentQuiz)
  // api_broadcast_quiz(current_quiz_id)//place this inside .then otherwise it would fire before .then because .then is async promise
})
// setTimeout(  () => {console.log(this.props.socketroom)} , 5000)
// setTimeout(  () => {
//   api_notify_of_quiz(currentQuiz);
// }, 5000)
}

  render() {


    return (
      <div className="TeacherView">
      <h1>Welcome to the Teacher View </h1>

      <Panel>
          <Panel.Heading><h2>{this.props.socketroom.broadcast_stack[0].stack_title}</h2></Panel.Heading>
          <ListGroup>
            {this.props.socketroom && this.renderStackItems()}
          </ListGroup>
          
        </Panel>
        
                    
                    {/* <h1>This is the timer value: {this.state.timestamp} </h1>  */}
                    <h2>{this.props.socketroom.broadcast_code}</h2> 
                    <Form inline>
        <FormControl 
            placeholder = 'Broadcast Code'
            onChange = { event => this.setState({ message: event.target.value})}
            />
        <Button onClick={() => this.sendMessage()}>Send Message to Studi</Button>
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

export default connect (mapStateToProps, {fetchBroadcast, ac_setCurrentQuiz})(TeacherView)