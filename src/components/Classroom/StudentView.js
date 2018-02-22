import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { subscribeToTimer, messenger, api_subscribe_to_quizes } from './api';
import { Form, FormControl, Button, ButtonGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import {fetchBroadcast } from '../../actions/index';

class StudentView extends Component {
  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
    api_subscribe_to_quizes((err, newQuizObj) => {
      this.setState({ newQuizObj:newQuizObj })
      console.log("here is the newQuizObj that arrived from socket into the student veiw", this.state.newQuizObj) ;
    } );
    this.state = {
      timestamp: 'no timestamp yet',
        message: '',
        broadcast_code: '',
        current_quiz_id: '',
        newQuizObj: {},
        exp_obj: {
          quiz_id: 1,
          question: "what the heck?"
        }
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.renderQuiz = this.renderQuiz.bind(this);
  }

  // api_subscribe_to_quizes(current_quiz_id){ console.log(current_quiz_id) }

  //<Button> {correct_answer} </Button>
  // <Button> {false_1} </Button>
  // <Button> {false_2} </Button>
  // <Button> {false_3} </Button>
  // <Button name={correct_answer} onClick={ this.submitAnswer(this.target.name)} > {correct_answer} </Button>
  //                 <Button name={false_1} onClick={ this.submitAnswer(this.target.name)} > {false_1} </Button>
  //                 <Button name={false_2} onClick={ this.submitAnswer(this.target.name)} > {false_2} </Button>
  //                 <Button name={false_3} onClick={ this.submitAnswer(this.target.name)} > {false_3} </Button>

  submitAnswer(buttonName){
    alert(buttonName);
  }

  renderQuiz(){

    console.log("renderQuiz fired and this.state.quizOb is ", this.state.newQuizObj)
    const { current_quiz_id, quiz_id, question, correct_answer, false_1, false_2, false_3, broadcast_id } = this.state.newQuizObj
    console.log("Here are the destructured value of this.state.newQuizObj.correct_answer", correct_answer)

    if (this.state.newQuizObj.question) {
      return (
        <div>
                <Panel>
                  <Panel.Heading><h2>{question}</h2></Panel.Heading>
                  <Panel.Body>
                    <ButtonGroup vertical block>
                    <Button onClick= { ()=> this.submitAnswer(correct_answer)} > {correct_answer} </Button>
                    <Button onClick= { ()=> this.submitAnswer(false_1)} > {false_1} </Button>
                    <Button onClick= { ()=> this.submitAnswer(false_2)} > {false_2} </Button>
                    <Button onClick= { ()=> this.submitAnswer(false_3)} > {false_3} </Button>
                </ButtonGroup>;
          
          
                  </Panel.Body>
            </Panel>
        </div>
        
            )
    } else {
      return (
        <h2> Waiting for teacher </h2>
      )
    }

   
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



//WED TEST -----------------------------------
  // expTest(){
  //     console.log('expTest fired')
  //    let obj = this.state.exp_obj
  //   messenger((err, serverResponse) => {
  //       console.log(serverResponse)
  //       // let broadcastObj = {
  //       //     broadcast_id: serverResponse.broadcast_id,
  //       //     broadcast_code: serverResponse.broadcast_code
  //       // }
  //       // this.setState({
  //       //     broadcast_code: broadcastObj.broadcast_code
  //       // })
  //   })
  // }

  render() {
    return (
      <div className="StudentView">
      <h1>Welcome to the Student View </h1>
     
        {this.renderQuiz()}
                      
                    {/* <h1>This is the timer value: {this.state.timestamp} </h1>   
                    <h1>This is current quiz id: {this.state.current_quiz_id} </h1>   
                    <h2>{this.state.broadcast_code}</h2> */}
                     <Form inline>
        <FormControl 
            placeholder = 'Send a message to the teacher'
            onChange = { event => this.setState({ message: event.target.value})}
            />
        <Button onClick={() => this.sendMySelection()}>Send Message to Teach</Button>
        <h3>{this.state.message}</h3>
        </Form> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    socketroom: state.socketroom
  };
}

export default connect (mapStateToProps, {fetchBroadcast})(StudentView)

