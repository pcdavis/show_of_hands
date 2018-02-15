import _ from "lodash";
import React, { Component } from "react";
import './dashboard.css'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStack } from "../../actions";
import { fetchStacks } from "../../actions";

class Dashboard extends Component {
    constructor(props){
      super(props);
      this.state = {
        title: ''
      }
      this.handleChange = this.handleChange.bind(this)
    }

  componentDidMount() {
    this.props.fetchStacks();
  }

  renderStacks() {
    
    return _.map(this.props.stacks, stack => {
      let index = stack.stack_id;
      console.log('index',index)
      
      return (
        <li className="list-group-item" key={index}>
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

export default connect(mapStateToProps, { fetchStacks, createStack })(Dashboard);
