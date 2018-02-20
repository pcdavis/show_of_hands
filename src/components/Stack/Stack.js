import _ from "lodash";
import axios from 'axios'
import React, { Component } from "react";
import './stack.css'
import { connect } from "react-redux";
import { createBroadcast, fetchStacks, fetchStackTitles, setTeacherID } from "../../actions";
import { Form, FormControl, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'


class Stack extends Component {
  constructor(props){
    super(props);
    this.state = {
      broadcast_code: '',
      theStackTitle: '',
      theStackContent: [],
      teacherID: ''
    }
    // this.handleChange = this.handleChange.bind(this)
  }
  

  componentDidMount() {
    //When stack.js is opened, we first call the action creators fetch stacks and fetchtitles to be sure we have the latest stack content. Then we grab the specific stack id from the url param and use it to filter the redux 'stacks' prop, which contains all of the teacher's stacks and get theStackNeeeded and place it in local state 'theStackContent'
    console.log("here is the user id to use for setting teacher id -----------------------",this.props.user_id)
    this.props.fetchStacks();
    this.props.fetchStackTitles();
     console.log('inside Stack component in component did mount this.props.stacks',this.props.stacks)
     let stackID = this.props.match.params.id;
     console.log("stack titles prop from redux state-------------------",this.props.stack_titles)
     console.log(stackID)
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

// handleChange(event){
//   this.setState({
//     broadcast_code: event.target.value
//   })
// }

startBroadcasting(){
  console.log("startBroadcast function fired")
  let this_user_id = this.state.theStackContent[0].user_id;
  let this_stack_id = this.state.theStackContent[0].stack_id;
console.log("deconstructed items userid--------------------------------" ,this_user_id)
console.log("deconstructed items stack_id--------------------------------" ,this_stack_id)

  //set redux state of teacherID
  this.props.setTeacherID(this.state.teacherID);

//create the broadcast object that we'll send via axios.post to server
  let broadcastObj = {
    broadcast_code: this.state.broadcast_code,
    user_id: this_user_id,
    stack_id: this_stack_id
  };
  //use axios call in here to insert the broadcast into the database table 'broadcast'. Then get the promise back, which is the info from the broadcast table needed to update redux minus the broadcast stack, which we'll merge into serverResponse before sending it to the action creator.
 axios.post('/api/newbroadcast', {broadcastObj}).then( (serverResponse)=> {
    let data = serverResponse.data
    console.log("inside the serverResponse variable after axios was called, here is the serverResposne object ---------------------", data)
    
    data.broadcast_stack = this.state.theStackContent
    
    this.props.createBroadcast(data)}).catch(error => console.log(error));

//After redux state of socketroom is updated with all the needed info, jump into the classroom for starting the broadcast session
this.props.history.push(`/classroom/${this.state.broadcast_code}`)

    //TODO this version below was working prior to changing strategy to update redux from inside here before jumping into the classroom
    // this.props.createBroadcast(broadcastObj, () => {
    //   this.props.history.push(`/classroom/${this.state.broadcast_code}`)
    // })

//use action creator to set redux state of broadcast info needed and then jump into the classroom

}

  render() {


    return (
      <div>
      
        <Panel>
          <Panel.Heading><h2>{this.state.theStackTitle}</h2></Panel.Heading>
          <ListGroup>
            {this.renderStackItems()}
          </ListGroup>
          <Panel.Body> <Button onClick={() => console.log("start broadcast")}>New Quiz Question</Button></Panel.Body>
        </Panel>;

        <div>
        <Form inline>
        <FormControl 
            placeholder = 'Broadcast Code'
            onChange = { event => this.setState({ broadcast_code: event.target.value})}
            />
        <Button onClick={() => this.startBroadcasting()}>Start Broadcast</Button>
        <h3>{this.state.broadcast_code}</h3>
        </Form>
        </div>

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

export default connect(mapStateToProps, {createBroadcast, fetchStacks, fetchStackTitles, setTeacherID} )(Stack);
