import _ from "lodash";
import React, { Component } from "react";
import './dashboard.css'
import { Form, FormControl, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStacks, createStack } from "../../actions";


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
      let index = stack.content_id;
      console.log('inside render stacks in dashboard. here is the mapped stack_id that I map to index',index)
      console.log('here is the statck object that is going through the lodash map inside render stacks', stack)
      return (
        <li className="list-group-item" key={stack.content_id}>
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

        <Form inline>
        <FormControl 
        placeholder = 'Stack Title'
        onChange = { event => this.setState({ title: event.target.value})}
        />
        <Button onClick={ () => this.props.createStack(this.state.title) }>Create New Stack</Button>
      </Form>

                
                  <h2>{this.state.title}</h2>


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
  return { stacks: state.stack_content };
}

export default connect(mapStateToProps, { fetchStacks, createStack })(Dashboard);
