import _ from "lodash";
import React, { Component } from "react";
import './dashboard.css'
import { Form, FormControl, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStacks, createStack, fetchStackTitles } from "../../actions";


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
    this.props.fetchStackTitles();
  }

  renderStacks() {
    
    return _.map(this.props.stacks, quizObj => {
      let index = quizObj.content_id;
      console.log('inside render stacks in dashboard. here is quizObj.content_id that I assign as the key to each link created',index)
      console.log('here is the quizObj object that is going through the lodash map inside render stacks', quizObj)
      return (
        <li className="list-group-item" key={quizObj.content_id}>
          <Link to={`/quiz/${quizObj.quiz_id}`}>
            {quizObj.question}
          </Link>
        </li>
      );
    });
  }

  renderStackTitles() {
    console.log("renderStackTitles fired-------------");
    console.log('this props stacktitles is ',this.props.stack_titles)
    return _.map(this.props.stack_titles, stackTitleItem => {
      let theStackID = stackTitleItem.stack_id;
      console.log('stack id render ---------',theStackID)
      console.log('here is the statck object that is going through the lodash map inside render stacks', stackTitleItem)
      return (
        <li className="list-group-item" key={stackTitleItem.stack_title}>
          <Link to={`/stacks/${stackTitleItem.stack_id}`}>
            {stackTitleItem.stack_title}
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
        
          {this.renderStackTitles()}
          
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    stacks: state.stack_content.stacks,
    stack_titles: state.stack_content.stackTitles 
  };
}

export default connect(mapStateToProps, { fetchStacks, fetchStackTitles, createStack })(Dashboard);
