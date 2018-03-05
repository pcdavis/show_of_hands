import _ from "lodash";
import axios from 'axios'
import React, { Component } from "react";
import './stack.css'
import { connect } from "react-redux";
import { createBroadcast, fetchStacks, fetchStackTitles, setTeacherID } from "../../actions";
import { Well, Form, FormGroup, Col, ControlLabel, FormControl, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import Navbar from '../CustomNavbar/CustomNavbar'
import { StyleSheet, css } from 'aphrodite';



class Stack extends Component {
  constructor(props){
    super(props);
    this.state = {
      broadcast_code: '',
      test: '',
      theStackTitle: '',
      theStackContent: [],
      teacherID: '',
      showForm: false,
      question: '',
      correct_answer: '', 
      false_1: '', 
      false_2: '', 
      false_3: '',
      stateItem: ''
    }
    // this.handleChange = this.handleChange.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }
  

  componentDidMount(){
    console.log("hello from cdm, here is this.props.stacks", this.props.stacks)
  }

  componentDidMount() {
    //When stack.js is opened, we first call the action creators fetch stacks and fetchtitles to be sure we have the latest stack content. Then we grab the specific stack id from the url param and use it to filter the redux 'stacks' prop, which contains all of the teacher's stacks and get theStackNeeeded and place it in local state 'theStackContent'
    console.log("here is the user id to use for setting teacher id -----------------------",this.props.stacks[0].user_id)
    console.log('inside Stack component in component did mount this.props.stacks',this.props.stacks)
    // this.props.fetchStacks();
    // this.props.fetchStackTitles();
     let stackID = this.props.match.params.id;
    //  console.log("stack titles prop from redux state-------------------",this.props.stack_titles)
    //  console.log(stackID)
    let theStackNeeded = _.filter(this.props.stacks, function(obj){
       return obj.stack_id == stackID
     })
     let titleNeeded = _.filter(this.props.stack_titles, function(obj){
       return obj.stack_id == stackID
     })
     let newStackContents = [...this.state.theStackContent,...theStackNeeded]
     console.log("here is the combined arrrays --------------------------------", newStackContents)
     console.log("theStackNeeded fromthe lodash filter is ", theStackNeeded)
     this.setState({ 
       theStackTitle: titleNeeded[0].stack_title,
       teacherID: titleNeeded[0].user_id,
       theStackContent: newStackContents
      }, ()=>  console.log("theStackContent fromthe local state is ", this.state.theStackContent))
  }

  renderStackItems() {
    let stackID = this.props.match.params.id;

    return _.map(this.props.stacks, quizObj => {
      let index = quizObj.content_id;
      // console.log('inside render stacks in dashboard. here is quizObj.content_id that I assign as the key to each link created',index)
      // console.log('here is the quizObj object that is going through the lodash map inside render stacks', quizObj)
        if(quizObj.stack_id == stackID){
          return (<ListGroupItem  key={quizObj.quiz_id}> {quizObj.question} </ListGroupItem>);
        }
    });
  }




startBroadcasting(){
  console.log("startBroadcast function fired")
  let this_user_id = this.state.theStackContent[0].user_id;
  let this_stack_id = this.state.theStackContent[0].stack_id;
  // console.log("deconstructed items userid--------------------------------" ,this_user_id)
  // console.log("deconstructed items stack_id--------------------------------" ,this_stack_id)
  
  //set redux state of teacherID
  this.props.setTeacherID(this.state.teacherID);
  
  //create the broadcast object that we'll send via axios.post to server
  let broadcastObj = {
    broadcast_code: this.state.broadcast_code,
    user_id: this_user_id,
    stack_id: this_stack_id
  };
  
  console.log("startBroadcast is about to call axios with this broadcastObj ", broadcastObj)
  //use axios call in here to insert the broadcast into the database table 'broadcast'. Then get the promise back, which is the info from the broadcast table needed to update redux minus the broadcast stack, which we'll merge into serverResponse before sending it to the action creator.
 axios.post('/api/newbroadcast', {broadcastObj}).then( (serverResponse)=> {
    let data = serverResponse.data
    console.log("inside the serverResponse variable after axios was called, here is the serverResposne object ---------------------", data)
    
    data.broadcast_stack = this.state.theStackContent
    
    this.props.createBroadcast(data)
    this.props.history.push(`/classroom/${this.state.broadcast_code}`)
  
  }
  
  ).catch(error => console.log(error));

//After redux state of socketroom is updated with all the needed info, jump into the classroom for starting the broadcast session
// this.props.history.push(`/classroom/${this.state.broadcast_code}`)

    //TODO this version below was working prior to changing strategy to update redux from inside here before jumping into the classroom
    // this.props.createBroadcast(broadcastObj, () => {
    //   this.props.history.push(`/classroom/${this.state.broadcast_code}`)
    // })

//use action creator to set redux state of broadcast info needed and then jump into the classroom
}

handleSubmit(e){

  e.preventDefault()
  console.log('handlesubmit fired for new quiz question-------------------------------')
  
  let my_user_id = this.props.stacks[0].user_id
  let mystack_id = this.props.match.params.id;
  console.log("my mystack_id" ,mystack_id)
    
  let newQuizObj = {
      user_id: my_user_id,
      question:this.state.question,
      correct_answer:this.state.correct_answer,
      false_1:this.state.false_1,
      false_2:this.state.false_2,
      false_3:this.state.false_3,
      stack_id:mystack_id
    }
    console.log(newQuizObj);

    axios.post('/api/newquestion', newQuizObj)
        .then( (response) => {

        console.log("here's what came back from the new quiz post" ,response)

    let myquiz_id = response.data.quiz_id;
    let myuser_id = response.data.user_id;
    let mystack_id = parseInt(this.props.match.params.id);

        let stackContentObj = {
          stack_id: mystack_id,
          quiz_id: myquiz_id,
          user_id: myuser_id
                             } 

    axios.post('/api/newstackcontent', stackContentObj)
    .then( (response) => { 

      console.log(response)
       this.props.fetchStacks();

    } )//end of .then used to fetchStacks

    this.setState({showForm: false});

  } )//end of .then that uses response to creating new quiz to send into axios post for creating stack content
} // end of submit new question function


//Backup of handlesubmit prior to using redux
// handleSubmit(){
//   console.log('handlesubmit fired for new quiz question-------------------------------')
// let my_user_id = this.props.stacks[0].user_id
// let mystack_id = this.props.match.params.id;
// console.log("my user id" ,my_user_id)
// let newQuizObj = {
//   user_id: my_user_id,
//   question:this.state.question,
//    correct_answer:this.state.correct_answer,
//    false_1:this.state.false_1,
//    false_2:this.state.false_2,
//    false_3:this.state.false_3,
//    stack_id:mystack_id
// }
// console.log(newQuizObj);
// axios.post('/api/newquestion', newQuizObj)
// .then((response) => {
//   console.log("here's what came back from the new quiz post" ,response)
//   let quiz_id = response.data[0].quiz_id;
//   let user_id = response.data[0].user_id;
//   let stack_id = this.props.match.params.id;
//   let stackContentObj = {
//     stack_id,
//     quiz_id,
//     user_id
//   }
//   console.log("here's stackContentObj" ,stackContentObj)
//   axios.post('/api/newstackcontent', stackContentObj)
// } )
// .then((response) => {

//   console.log("here's what came back from the newstackcontent------------------------" ,response)
//   this.setState({showForm: false});
//   this.props.fetchStacks();
// } )
// }

handleChange(event) {
  let fieldName = event.target.name;
  let fleldVal = event.target.value;
  this.setState({ [fieldName]: fleldVal})
}

renderForm(){
  if (this.state.showForm) {
    return (
      <div>
        <div className="block10"></div>
<Well>
  
          <Form horizontal >
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Quiz Question
        </Col>
        <Col sm={10}>
          <FormControl
           name = "question" 
           type="text" 
           placeholder="Question" 
           defaultValue={this.state.question}
           onChange={this.handleChange.bind(this)} />
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Correct Answer
        </Col>
        <Col sm={10}>
          <FormControl
          name = "correct_answer" type="text" placeholder="Correct Answer"
          defaultValue={this.state.correct_answer}
          onChange={this.handleChange.bind(this)} />
        </Col>
      </FormGroup>
    
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
        False Choice 1
        </Col>
        <Col sm={10}>
          <FormControl 
          name = "false_1" 
          type="text" 
          placeholder="Enter a false answer choice" 
          defaultValue={this.state.false_1}
          onChange={this.handleChange.bind(this)} />
        </Col>
      </FormGroup>
    
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
        False Choice 2
        </Col>
        <Col sm={10}>
          <FormControl 
          name = "false_2" 
          type="text" 
          placeholder="Enter a false answer choice" 
          defaultValue={this.state.false_2}
          onChange={this.handleChange.bind(this)} />
        </Col>
      </FormGroup>
    
      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
        False Choice 3
        </Col>
        <Col sm={10}>
          <FormControl 
          name = "false_3" 
          type="text" 
          placeholder="Enter a false answer choice" 
          defaultValue={this.state.false_3}
          onChange={this.handleChange.bind(this)} />
        </Col>
      </FormGroup>
    
      <FormGroup>
       
          <Button onClick={()=> this.setState({showForm: false})} type="submit">Cancel</Button>
        
          <Button onClick={(e) => this.handleSubmit(e)} type="submit">Submit</Button>
        
      </FormGroup>
    </Form >

</Well> 


      </div>
    )

  }
 
}

  render() {


    return (
      <div>
      <Navbar/>
      <div className="block35"></div>
        <Panel>
          <Panel.Heading><h2>{this.state.theStackTitle}</h2></Panel.Heading>
          <ListGroup>
            {this.renderStackItems()}
          </ListGroup>
          
          {this.renderForm()}

          <Panel.Body> <Button onClick={() => this.setState({showForm: true})}>New Quiz Question</Button></Panel.Body>
        </Panel>

        <Well>
        <Form inline
        className="percent-90">
        <FormGroup>
        <FormControl 
        className={css(styles.font20)}
            placeholder = 'Broadcast Code'
            onChange = { event => this.setState({ broadcast_code: event.target.value})}
            />
        </FormGroup>
        <Button className={css(styles.purple)} bsSize="large" block onClick={() => this.startBroadcasting()}>Start Broadcast</Button>
        </Form>
        </Well>
       

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    stacks: state.stack_content.stacks,
    stack_titles: state.stack_content.stackTitles,
    socketroom: state.socketroom //this is a state object with multiple keys related to broadcast
   };
}

export default connect(mapStateToProps, {createBroadcast,fetchStacks, fetchStackTitles, setTeacherID} )(Stack);

const styles = StyleSheet.create({
  purple: {
      backgroundColor: 'rgb(105, 32, 101)',
      color: 'white'
  },

  font20: {
      fontSize: 20
  }
});