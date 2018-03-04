import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import axios from 'axios';
import { subscribeToTimer, messenger, api_subscribe_to_quizes, api_subscribe_to_responses, api_emit_my_responses, api_subscribe_to_new_students, api_subscribe_to_topFive } from './api';
import { Form, FormControl, Button, ButtonGroup, Panel, ListGroup, ListGroupItem, Alert } from 'react-bootstrap'
import {ac_setCurrentQuiz } from '../../actions/index';
import { ToastContainer, toast } from 'react-toastify'

import {Bar, Doughnut, Line, Pie, Polar, Radar} from 'react-chartjs-2';
import {CardColumns, Card, CardHeader, CardBody} from 'reactstrap';
import Navbar2 from '../CustomNavbar/CustomNavbar2'
import logo from './logo-hands-purple-01.svg';
import Modals from './Modals'
import './studentview.css'
// import ReactCSSTransitionGroup from './react-addons-css-transition-group'


class StudentView extends Component {
  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
    
    
    api_subscribe_to_quizes( (err, newQuizObj) => {

      this.props.ac_setCurrentQuiz(newQuizObj)

      this.setState({ newQuizObj:newQuizObj,
                      quizIsVisible: true,
                      waitingForTeacher: false,
                      chartIsVisible: false,
                      totalresponses: 0,
                      correct_answers: 0,
                      false_1s: 0,
                      false_2s: 0,
                      false_3s: 0,
                      resultsFinal: false })
                      });

    api_subscribe_to_topFive( (err, topFiveNames) => {
      console.log("api_subscribe_to_topFive fired, here are topFiveNames ",topFiveNames );
      this.setState({ topFiveNames:topFiveNames,
                      resultsFinal: true,
                      chartIsVisible: false })
                    });

    api_subscribe_to_new_students( (err, newStudentIdentity) => {
      console.log("here is the newStudentIdentity that arrived from socket into the new_student", newStudentIdentity);
      console.log("here is this.state.enrolled_students before adding the new one", this.state.enrolled_students);
      
      let updated_enrollment = [...this.state.enrolled_students, newStudentIdentity.screenName]
      this.setState({enrolled_students: updated_enrollment})
      console.log("here is this.state.enrolled_students AFTER adding the new one", this.state.enrolled_students);
      // toast.success("Hello " ,newStudentIdentity.screenName)
    } );
    
    this.state = {
      timestamp: 'no timestamp yet',
      message: '',
      broadcast_code: '',
      current_quiz_id: '',
      quizIsVisible: false,
      chartIsVisible: false,
      topFiveNames:[],
      resultsFinal: false,
      newQuizObj: {},
      waitingForTeacher: true,
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
    this.renderEnteringStudents = this.renderEnteringStudents.bind(this);
  }//End of CONSTSRUCTOR

  componentDidMount(){
    console.log("here are socket props in cdm in studentview-----------------------",this.props.socketroom)
  }


//This version goes through socket emit on client side. probably not the way to do it
  submitAnswer(buttonKey,buttonName){
    console.log("submit answer fired and here is the current state of props from redux for socketroom", this.props.socketroom)
    
    this.setState({ selectedAnswer: buttonKey});
    
    const { current_quiz_id, quiz_id, question, correct_answer, false_1, false_2, false_3, broadcast_id } = this.props.socketroom.current_quiz
    const myScreenName = this.props.socketroom.myStudentID.screenName;
    const mySessionID = this.props.socketroom.myStudentID.sessionID;

    let responseObj = {
      selectedAnswer: buttonKey,
      selectedAnswerText: buttonName,
      response_timestamp: new Date().getTime(),
      broadcast_id: this.props.socketroom.current_quiz.broadcast_id,
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

renderTopFive(){
  if(this.state.resultsFinal){
    
      return (
        <Panel className="room-card room-card-content">
          <Panel.Heading><h2>High Fives to the Fastest Five</h2></Panel.Heading>
          <ListGroup>
          
          <ListGroupItem className="animated bounceInUp" > <h3>{this.state.topFiveNames[0]}</h3> </ListGroupItem>
          <ListGroupItem className="animated bounceInUp" > <h3>{this.state.topFiveNames[1]}</h3> </ListGroupItem>
          <ListGroupItem className="animated bounceInUp" > <h3>{this.state.topFiveNames[2]}</h3> </ListGroupItem>
          <ListGroupItem className="animated bounceInUp" > <h3>{this.state.topFiveNames[3]}</h3> </ListGroupItem>
          <ListGroupItem className="animated bounceInUp" > <h3>{this.state.topFiveNames[4]}</h3> </ListGroupItem>
           
          </ListGroup>
       </Panel>
      )
    
  }
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
            this.props.socketroom.current_quiz.correct_answer,
            this.props.socketroom.current_quiz.false_1,
            this.props.socketroom.current_quiz.false_2,
            this.props.socketroom.current_quiz.false_3
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
          <div className="room-card animated flipInX">

          <div className="room-card-content">

            <CardColumns className="cols-2">

            <Card>
              <CardHeader>
                <h3>{this.props.socketroom.current_quiz.question}</h3>
                
                
              </CardHeader>
            
                <div className="chart-wrapper">
                  <Doughnut data={doughnut}/>
                </div>
              
            </Card>

                  
                  <div className="chart-totals">
                  <h3>The correct answer is: {this.props.socketroom.current_quiz.correct_answer}</h3>
                        <h4>Total responses: {this.state.totalresponses} </h4>
                        <h5>{this.props.socketroom.current_quiz.correct_answer}: {this.state.correct_answers} </h5>
                        <h5>{this.props.socketroom.current_quiz.false_1}: {this.state.false_1s} </h5>
                        <h5>{this.props.socketroom.current_quiz.false_2}: {this.state.false_2s} </h5>
                        <h5>{this.props.socketroom.current_quiz.false_3}: {this.state.false_3s} </h5>

                  </div>

           </CardColumns> 
           </div>
        </div>
      )
        
      }

    }
  }
  
//new render quiz with randomized answers
  renderQuiz(){
    let currentQuiz = this.props.socketroom.current_quiz;
    console.log("renderQuiz fired and this.state.quizOb is ", currentQuiz)
    const { current_quiz_id, quiz_id, question, false_1, false_2, false_3, broadcast_id, correct_answer, answerButtons } = currentQuiz
    console.log("Here are the destructured value of currentQuiz.correct_answer", correct_answer)

    if (currentQuiz.question && this.state.quizIsVisible) {
      
       let generatedButtons = answerButtons.map( item => {
           return (
            <Button  onClick= { ()=> this.submitAnswer (item.key_val, item.text)} > {item.text} </Button>
           )
       })

      return (
        <div className="animated slideInRight quiz-card">
                <Panel className="quiz-panel" >
                  <Panel.Heading className="quiz-panel-header"  ><h2>{question}</h2></Panel.Heading>
                  <Panel.Body>
                    <ButtonGroup bsSize="large" block className="quiz-buttons" vertical block>
                    {generatedButtons}
                </ButtonGroup>;
                </Panel.Body>
            </Panel>
        </div>
      )
    }
} 

renderIntro(){
  if(this.state.waitingForTeacher){


    return (

    <div className="class-intro">

      <h1>Welcome to the classroom </h1>
      <h3 className="classroom-spacer-25">We'll begin shortly </h3>

      <div className="svg-loader1">
     
        <svg width="70" height="20">
          <rect width="20" height="20" x="0" y="0" rx="3" ry="3">
            <animate attributeName="width" values="0;20;20;20;0" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="height" values="0;20;20;20;0" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="x" values="10;0;0;0;10" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="y" values="10;0;0;0;10" dur="1000ms" repeatCount="indefinite"/>
          </rect>
          <rect width="20" height="20" x="25" y="0" rx="3" ry="3">
            <animate attributeName="width" values="0;20;20;20;0" begin="200ms" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="height" values="0;20;20;20;0" begin="200ms" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="x" values="35;25;25;25;35" begin="200ms" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="y" values="10;0;0;0;10" begin="200ms" dur="1000ms" repeatCount="indefinite"/>
          </rect>
          <rect width="20" height="20" x="50" y="0" rx="3" ry="3">
            <animate attributeName="width" values="0;20;20;20;0" begin="400ms" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="height" values="0;20;20;20;0" begin="400ms" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="x" values="60;50;50;50;60" begin="400ms" dur="1000ms" repeatCount="indefinite"/>
            <animate attributeName="y" values="10;0;0;0;10" begin="400ms" dur="1000ms" repeatCount="indefinite"/>
          </rect>
        </svg>
      </div> 

      <img src={logo} className="logo-purple" alt="logo" />
    </div>

    )
  }
}

renderEnteringStudents(){

      if(this.state.waitingForTeacher && this.state.enrolled_students.length > 0){
        console.log("this.state.enrolled_students")
        console.log(this.state.enrolled_students)
        let copyOfEnrollment = [...this.state.enrolled_students]
        console.log("copyOfEnrollment", copyOfEnrollment)

        let studentName = copyOfEnrollment.pop()
        this.setState({enrolled_students: copyOfEnrollment})
        // alert(studentName);

        return(
          <div className="arriving-student">
            <Alert bsStyle="info" >
            <strong>Hello {studentName}!</strong> Thanks for joining the class.
              
            </Alert>
          </div>
        )
      }
}


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
      <ToastContainer />
      <Navbar2/>
        {this.renderEnteringStudents()}
        {this.renderIntro()}
        {this.renderTopFive()}
        {this.renderChart()}
        {this.renderQuiz()}
                      
        {/* <Form inline>
        <FormControl 
            placeholder = 'Send a message to the teacher'
            onChange = { event => this.setState({ message: event.target.value})}
            />
        <Button onClick={() => this.sendMySelection()}>Send Message to Teach</Button>
        <h3>{this.state.message}</h3>
        </Form>  */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    socketroom: state.socketroom
  };
}

export default connect (mapStateToProps, {ac_setCurrentQuiz} )(StudentView)

