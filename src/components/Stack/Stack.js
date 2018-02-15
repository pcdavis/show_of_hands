import _ from "lodash";
import React, { Component } from "react";
import './dashboard.css'
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

  // componentDidMount() {
  //   this.props.fetchStackItems();
  // }

  renderStacksItems() {
    let stackKeys = Object.keys(this.props.stacks);
    return _.map(this.props.stacks.stackItems, stackItem => {
      return (
        <li className="list-group-item" key={stack.stack_id}>
          <Link to={`/stacks/${stack.stack_id}`}>
            {stack.stack_title}
          </Link>
        </li>
      );
    });
  }



handleChange(event){
  this.setState({
    title: event.target.value
  })
}

  render() {
    console.log('this.props.stacks',this.props.stacks)
    
    return (
      <div>
        <div className="text-xs-right">

                  <form>
                  <input
                      placeholder="Stack Title"
                      name = "title" 
                      type="text" 
                      onChange={this.handleChange}
                  />
                      <br/>
                  <button label="Submit" className="btn btn-primary" type = "submit" onClick={() => createStack(this.state.title) } >New Stack</button>
                  </form>
                  <h2>{this.state.title}</h2>


          <Link className="btn btn-primary" to="/stacks/new">
            Add a Stack
          </Link>
        </div>
        <h3>Stacks</h3>
        
        <ul className="list-group">
        
          {this.renderStacks()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stacks: state.stacks };
}

export default connect(mapStateToProps, )(Stack);
