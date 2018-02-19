import _ from "lodash";
import React, { Component } from "react";
import './stack.css'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStackItems } from "../../actions";


class Stack extends Component {
    // constructor(props){
    //   super(props);
    //   this.state = {
    //     new_stack_title: '',
    //     new_
    //   }
    //   this.handleChange = this.handleChange.bind(this)
    // }

  componentDidMount() {
 
    console.log('inside Stack component in component did mount this.props.stacks',this.props.stacks)

    // let this_stack = _.filter(this.props.stacks, this.props.stacks.stack_id === stackID);
    // let allStackContents = this.props.stacks;
    // let this_stack = _.mapValues(allStackContents, function(o) { 
    //   if(o.stack_id === stackID) {
    //     return o;
    //   }   });
    // let this_stack =  _.filter( this.props.stacks, {stack_id: stackID})
    // let this_stack =  _.filter( this.props.stacks, {stack_id: stackID})
    // let this_stack =  this.props.stacks.filter( stackItem => {
    //   return stackItem.stack_id === stackID
    // })

 
    // console.log('this_stack',this_stack)
    
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

  // renderStacksItems() {

  // return _.map(this.props.stacks.stack)
  //   let stackKeys = Object.keys(this.props.stacks);
  //   console.log('stackKeys',stackKeys)
    
  //   return _.map(this.props.stacks.stackItems, stackItem => {
  //     return (
  //       <li className="list-group-item" key={stack.stack_id}>
  //         <Link to={`/stacks/${stack.stack_id}`}>
  //           {stack.stack_title}
  //         </Link>
  //       </li>
  //     );
  //   });
  // }



// handleChange(event){
//   this.setState({
//     title: event.target.value
//   })
// }

  render() {
    
    // let stackID = this.props.match.params.id;
    // const {stack_title,question,correct_answer, false_1, false_2, false_3} = this.props.stacks[stackID];
    return (
      <div>
      
        <h1> Hello to the Stack</h1>
        {this.renderStackItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stacks: state.stack_content };
}

export default connect(mapStateToProps, {fetchStackItems} )(Stack);
