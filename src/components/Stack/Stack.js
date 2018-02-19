import _ from "lodash";
import React, { Component } from "react";
import './stack.css'
import { connect } from "react-redux";
import { startBroadcast } from "../../actions";
import { Form, FormControl, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'


class Stack extends Component {
  constructor(props){
    super(props);
    this.state = {
      broadcast_code: '',
      theStackTitle: ''
    }
    // this.handleChange = this.handleChange.bind(this)
  }
  

  componentDidMount() {
     console.log('inside Stack component in component did mount this.props.stacks',this.props.stacks)
     let stackID = this.props.match.params.id;
     console.log("stack titles prop from redux state-------------------",this.props.stack_titles)
     console.log(stackID)
     let thisStackTitle = _.filter(this.props.stack_titles, function(obj){
       return obj.stack_id == stackID
     })
     console.log("thisStack fromthe lodash filter is ", thisStackTitle)
     this.setState({ theStackTitle: thisStackTitle[0].stack_title})

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

startBoadcast(){
  console.log("startBroadcast function fired")

  this.props.startBroadcast({
    broadcast_code: this.state.broadcast_code,

  })
}

  render() {
    const stackTitle = this.props.stacks.stack_title;
    console.log("Inside render here is stackTitle -------------------------------------------", stackTitle);

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
        <Button onClick={() => this.startBoadcast()}>Start Broadcast</Button>
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

export default connect(mapStateToProps, {startBroadcast} )(Stack);
