import _ from "lodash";
import React, { Component } from "react";
import './stack.css'
import { connect } from "react-redux";
import { createBroadcast, fetchStacks, fetchStackTitles } from "../../actions";
import { Form, FormControl, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'


class Stack extends Component {
  constructor(props){
    super(props);
    this.state = {
      broadcast_code: '',
      theStackTitle: '',
      theStackContent: []
    }
    // this.handleChange = this.handleChange.bind(this)
  }
  

  componentDidMount() {
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
  let broadcastObj = {
    broadcast_code: this.state.broadcast_code,
    user_id: this_user_id,
    stack_id: this_stack_id
  }

  this.props.createBroadcast(broadcastObj, () => {
    this.props.history.push(`/classroom/${this.state.broadcast_code}`)
  })
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
    stack_titles: state.stack_content.stackTitles };
}

export default connect(mapStateToProps, {createBroadcast, fetchStacks, fetchStackTitles} )(Stack);
