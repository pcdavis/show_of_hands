import _ from "lodash";
import React, { Component } from "react";
import './dashboard.css'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStack } from "../../actions";
import { fetchStacks } from "../../actions";
import { connectSocket } from 'socket.io-react';

class Dashboard extends Component {
    constructor(props){
      super(props);
      this.state = {
        title: ''
      }
      this.handleChange = this.handleChange.bind(this)
    }

  componentDidMount() {
    //This will bring back all quizes from all stacks for this user_id. The action creator fetchStacks will send it to the reducer_stacks.js which will assign it to the state.stacks object on the main redux state object
    this.props.fetchStacks();
  }

  renderStacks() {
    //this lodash method maps over the object called stacks and returns an array with each stack object assigned to an array index value equal to it's key in the stacks object, which is equal to it's stack_content_id. So to access any 
    return _.map(this.props.stacks, stack => {
      let index = stack.stack_id;
      console.log('inside render stacks in dashboard. here is the mapped stack_id that I map to index',index)
      console.log('here is the statck object that is going through the lodash map inside render stacks', stack)
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

// const socketConnected = connectSocket(Dashboard);
// const reduxConnected = connect(mapStateToProps, { fetchStacks, createStack })(socketConnected);
const reduxConnected = connect(mapStateToProps, { fetchStacks, createStack })(Dashboard);

export default reduxConnected;