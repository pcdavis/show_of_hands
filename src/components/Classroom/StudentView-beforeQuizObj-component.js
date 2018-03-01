import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import axios from 'axios';
import { subscribeToTimer, messenger, api_subscribe_to_quizes, api_subscribe_to_responses, api_emit_my_responses, api_subscribe_to_new_students } from './api';
import { Form, FormControl, Button, ButtonGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

import {Bar, Doughnut, Line, Pie, Polar, Radar} from 'react-chartjs-2';
import {CardColumns, Card, CardHeader, CardBody, Alert} from 'reactstrap';
import Modals from './Modals'


class StudentView extends Component {
  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
    
    
    api_subscribe_to_quizes( (err, newQuizObj) => {
      this.setState({ newQuizObj:newQuizObj,
                      quizIsVisible: true,
                    chartIsVisible: false,
                    totalresponses: 0,
                    correct_answers: 0,
                    false_1s: 0,
                    false_2s: 0,
                    false_3s: 0 })
                    });
    
    api_subscribe_to_new_students( (err, newStudentIdentity) => {
      console.log("here is the newStudentIdentity that arrived from socket into the new_student", newStudentIdentity);
      console.log("here is this.state.enrolled_students before adding the new one", this.state.enrolled_students);
      let updated_enrollment = [...this.state.enrolled_students, newStudentIdentity.screenName]
      this.setState({ enrolled_students:updated_enrollment }, ()=> {
        
      })
      
      console.log("here is this.state.enrolled_students AFTER adding the new one", this.state.enrolled_students);
      
    } );
    
    this.state = {
      timestamp: 'no timestamp yet',
      message: '',
      broadcast_code: '',
      current_quiz_id: '',
      quizIsVisible: false,
      chartIsVisible: false,
      newQuizObj: {},
      exp_obj: {
        quiz_id: 1,
        question: "what the heck?"
      },
      enrolled_students: [],
      selectedAnswer: '',
      correct_answers: 0,
      false_1s: 0,
      false_2s: 0,
      false_3s: 0,
      totalresponses: 0
    };

    //Here's what the response object looks like going into broadcast response socket call
//     broadcast_id: null
// quiz_id: 3
// response_id: 13
// response_timestamp: "1519663423505"
// screen_name: ""
// selected_answer: "correct_answer"
// selected_answer_text: "Albany"
// stack_id: null
// user_id: null
// user_session_id: null
    
    api_subscribe_to_responses( (err, newResponse) => {
      console.log("api_subscribe_to_responses. here is the newResponse object", newResponse)
    

     let response_id = newResponse.response_id 
     let user_session_id = newResponse.user_session_id
     let selected_answer = newResponse.selected_answer
     let selected_answer_text = newResponse.selected_answer_text
     let response_timestamp = newResponse.response_timestamp
     let screen_name = newResponse.screen_name
     let broadcast_id = newResponse.broadcast_id
     let user_id = newResponse.user_id
     let stack_id = newResponse.stack_id
     let quiz_id = newResponse.quiz_id

      if(selected_answer.length > 0){
        let curentResponses = this.state.totalresponses;
        curentResponses++;

        this.setState({totalresponses: curentResponses})
        
         
           if(selected_answer ==="correct_answer"){
             let currentCorrects = this.state.correct_answers
             currentCorrects++
             this.setState({ correct_answers: currentCorrects})
           }
           
           if(selected_answer ==="false_1"){
             this.setState({ false_1s : ++this.state.false_1s})
           }
           
           if(selected_answer ==="false_2"){
             this.setState({ false_2s : ++this.state.false_2s})
           }
           
           if(selected_answer ==="false_3"){
             this.setState({ false_3s : ++this.state.false_3s})
           }
           
      }
  })

    this.sendMessage = this.sendMessage.bind(this);
    this.renderQuiz = this.renderQuiz.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }//End of CONSTSRUCTOR

  componentDidMount(){
    console.log("here are socket props in cdm in studentview-----------------------",this.props.socketroom)
  }


//This version goes through socket emit on client side. probably not the way to do it
  submitAnswer(buttonKey,buttonName){
    console.log("submit answer fired and here is the current state of props from redux for socketroom", this.props.socketroom)
    
    this.setState({ selectedAnswer: buttonKey});
    
    const { current_quiz_id, quiz_id, question, correct_answer, false_1, false_2, false_3, broadcast_id } = this.state.newQuizObj
    const myScreenName = this.props.socketroom.myStudentID.screenName;
    const mySessionID = this.props.socketroom.myStudentID.sessionID;

    let responseObj = {
      selectedAnswer: buttonKey,
      selectedAnswerText: buttonName,
      response_timestamp: new Date().getTime(),
      broadcast_id: this.props.socketroom.broadcast_id,
      screen_name: myScreenName,
      user_session_id: mySessionID,
      user_id: '',
      stack_id: this.props.socketroom.stack_id,
      quiz_id: quiz_id,
      question: question,
      correct_answer: correct_answer,
   };
   console.log("here is the responseObj beign sent to axios in submit answer function ", responseObj)
   axios.post('/api/responses', {responseObj})
   .then( (response) => {
     console.log("here is the server response that comes back to submitAnswer" ,response.data);
     api_emit_my_responses(response.data)
     this.setState({ quizIsVisible: false, chartIsVisible: true })
   })
}
 
  renderChart(){

    if(this.state.chartIsVisible) {

      if(this.state.totalresponses > 0 ){
        //render the chart in here using the response data
        let correct_answers =this.state.correct_answers;
        let false_1s = this.state.false_1s;
        let false_2s = this.state.false_2s;
        let false_3s = this.state.false_3s;
        let totalresponses = this.state.totalresponses;
  
        const doughnut = {
          labels: [
            this.state.newQuizObj.correct_answer,
            this.state.newQuizObj.false_1,
            this.state.newQuizObj.false_2,
            this.state.newQuizObj.false_3
          ],
          datasets: [{
            data: [correct_answers, false_1s, false_2s, false_3s],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#cc0066'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#cc0066'
            ]
          }]
        };
  
        return (
          <div className="animated fadeIn">
            <CardColumns className="cols-2">
            <Card>
              <CardHeader>
                Student Responses
                <div className="card-actions">
                  <a href="http://www.chartjs.org">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
            
                <div className="chart-wrapper">
                  <Doughnut data={doughnut}/>
                </div>
              
            </Card>
  
           </CardColumns>
        </div>
      )
        
      }

    }
  }
  
//new render quiz with randomized answers
  renderQuiz(){
    console.log("renderQuiz fired and this.state.quizOb is ", this.state.newQuizObj)
    const { current_quiz_id, quiz_id, question, false_1, false_2, false_3, broadcast_id, correct_answer } = this.state.newQuizObj
    console.log("Here are the destructured value of this.state.newQuizObj.correct_answer", correct_answer)

    if (this.state.newQuizObj.question && this.state.quizIsVisible) {
      console.log("false_1", false_1)
      console.log("false_2", false_2)
      console.log("false_3", false_3)
      console.log("correct_answer", correct_answer)

      let falsey1 = {text: false_1, key_val: "false_1"};
      let falsey2 = {text: false_2, key_val: "false_2"};
      let falsey3 = {text: false_3, key_val: "false_3"};

      let randomAnswerArray = [falsey1,falsey2,falsey3]
      // let randomAnswerArray = [{text: false_1, key_val: "false_1"},{text: false_2, key_val: "false_2"},{text: false_3, key_val: "false_3"}]

      console.log("randomAnswerArray is" ,randomAnswerArray)
      let correctItem = {text: correct_answer, key_val: "correct_answer"};
       console.log("correctItem is" ,correctItem)
       let indexOfCorrect = _.random(0,2);
       console.log("indexOfCorrect is" ,indexOfCorrect)
       randomAnswerArray.splice(indexOfCorrect,0,correctItem)
       console.log(randomAnswerArray)
       const finalArray = [...randomAnswerArray]
       let generatedButtons = finalArray.map( item => {
           return (
            <Button onClick= { ()=> this.submitAnswer (item.key_val, item.text)} > {item.text} </Button>
           )
       })

      return (
        <div>
                <Panel className={this.state.quizIsVisible} >
                  <Panel.Heading><h2>{question}</h2></Panel.Heading>
                  <Panel.Body>
                    <ButtonGroup vertical block>
                    {generatedButtons}
                </ButtonGroup>;
                </Panel.Body>
            </Panel>
        </div>
      )
    }
} 
// end of renderQuiz



  // Below is the original renderQuiz
//   renderQuiz(){
//     console.log("renderQuiz fired and this.state.quizOb is ", this.state.newQuizObj)
//     const { current_quiz_id, quiz_id, question, correct_answer, false_1, false_2, false_3, broadcast_id } = this.state.newQuizObj
//     console.log("Here are the destructured value of this.state.newQuizObj.correct_answer", correct_answer)

//     if (this.state.newQuizObj.question) {
//       return (
//         <div>
//                 <Panel>
//                   <Panel.Heading><h2>{question}</h2></Panel.Heading>
//                   <Panel.Body>
//                     <ButtonGroup vertical block>
//                     <Button onClick= { ()=> this.submitAnswer ("correct_answer", correct_answer)} > {correct_answer} </Button>
//                     <Button onClick= { ()=> this.submitAnswer("false_1", false_1)} > {false_1} </Button>
//                     <Button onClick= { ()=> this.submitAnswer("false_2" ,false_2)} > {false_2} </Button>
//                     <Button onClick= { ()=> this.submitAnswer("false_3" ,false_3)} > {false_3} </Button>
//                 </ButtonGroup>;
//                 </Panel.Body>
//             </Panel>
//         </div>
//       )
//     } else {
//       return (
//         <h2> Waiting for teacher </h2>
//       )
//     }
// } 
// end of renderQuiz


//   renderStudentNames(){
//     console.log("renderStudentNames fired and this.state.enrolled_students is ", this.state.enrolled_students)
  
//     if (this.state.enrolled_students.length > 0) {
//       this.state.enrolled_students.map( student => {
//         return (
//           <Alert bsStyle="warning">
//     <strong>Holy guacamole!</strong> {student.screenName}
//   </Alert>
//         )})
      
//     } else {
//       return (
//         <h2> Waiting for students to enroll </h2>
//       )
//     }
// } // end of renderStudentNames

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
// sendMySelection(){
//   let myResponse = this.state.exp_obj;
//   console.log(myResponse)
//   axios.post('/api/studentresponses',{myResponse})
//   .then( (response) => {
//     console.log("here is the response from sendMySelection-----------" ,response)
//   })
// }


  render() {
    return (
      <div className="StudentView">
      
      <h1>Welcome to the Student View </h1>
      <h1>Welcome to the students in the class </h1>
      <h1>total responses: {this.state.totalresponses} </h1>
      <h1>Number of correct_answers: {this.state.correct_answers} </h1>
      <h1>Number of false_1s: {this.state.false_1s} </h1>
      <h1>Number of false_2s: {this.state.false_2s} </h1>
      <h1>Number of false_3s: {this.state.false_3s} </h1>
     
        {this.state.enrolled_students}
        {this.renderChart()}
        {this.renderQuiz()}
                      
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

export default connect (mapStateToProps, null)(StudentView)

