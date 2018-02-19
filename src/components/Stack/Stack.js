import _ from "lodash";
import React, { Component } from "react";
import './stack.css'
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
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
    let stackID = this.props.match.params.id;
    console.log('this.props.match.params.id',this.props.match.params.id)
    console.log('stackID is equal to this.props.match.params.id',stackID)
    console.log('inside Stack component in component did mount this.props.stacks',this.props.stacks)

   
    let this_stack =  this.props.stacks[stackID];
 
    console.log('this_stack',this_stack)
    
  }

  // renderStacksItems() {
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
    console.log('this.props.stacks',this.props.stacks)
    let stackID = this.props.match.params.id;
    const {stack_title,question,correct_answer, false_1, false_2, false_3} = this.props.stacks[stackID];
    return (
      <div>
        <h1>Stack Component</h1>
        <h1>{stack_title}</h1>
        <h1>{question}</h1>
        <h1>{correct_answer}</h1>
        <h1>{false_1}</h1>
        <h1>{false_2}</h1>
        <h1>{false_3}</h1>
        


      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stacks: state.stacks };
}

export default connect(mapStateToProps, {fetchStackItems} )(Stack);
