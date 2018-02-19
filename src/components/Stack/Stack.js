import _ from "lodash";
import React, { Component } from "react";
import './stack.css'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStackItems } from "../../actions";
import { Form, FormControl, Button } from 'react-bootstrap'


class Stack extends Component {
  constructor(props){
    super(props);
    this.state = {
      broadcast_code: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  

  componentDidMount() {
     console.log('inside Stack component in component did mount this.props.stacks',this.props.stacks)
  }

  renderStackItems() {
    let stackID = this.props.match.params.id;
    console.log('this.props.match.params.id',this.props.match.params.id)
    console.log('stackID is equal to this.props.match.params.id',stackID)

    
    
    return _.map(this.props.stacks, stack => {
      console.log("mapping in the stack page the stack item with stack id of------------------- ", stack.stack_id)
      if(stack.stack_id == stackID){

        return (
          <li className="list-group-item" key={stack.quiz_id}>
          <Link to={`/quiz/${stack.quiz_id}`}>
            {stack.question}
          </Link>
        </li>
        );
      }
    });
  }




handleChange(event){
  this.setState({
    broadcast_code: event.target.value
  })
}

  render() {
    const stackTitle = this.props.stacks.stack_title;

    
    // let stackID = this.props.match.params.id;
    // const {stack_title,question,correct_answer, false_1, false_2, false_3} = this.props.stacks[stackID];
    return (
      <div>
      
        <h1> Welcome to your stack</h1>
        <h1> {this.props.stacks.stack_title} </h1>
        {this.renderStackItems()}

        <div>
        <Form inline>
        <FormControl 
        placeholder = 'Broadcast Code'
        onChange = { event => this.setState({ title: event.target.value})}
        />
        
        <Button onClick={() => console.log("start broadcast")}>Start Broadcast</Button>
      </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stacks: state.stack_content.stacks };
}

export default connect(mapStateToProps, {fetchStackItems} )(Stack);
