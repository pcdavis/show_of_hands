import _ from "lodash";
import React, { Component } from "react";
import './dashboard.css'
import { Form, FormControl, Button, ListGroup, ListGroupItem, Fade } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link, History } from "react-router-dom";
import { fetchStacks, createStack, fetchStackTitles, deleteStack } from "../../actions";
import Navbar from '../CustomNavbar/CustomNavbar'


class Dashboard extends Component {
    constructor(props){
      super(props);
      this.state = {
        title: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.onDeleteClick = this.onDeleteClick.bind(this)
    }

  componentDidMount() {
    this.props.fetchStacks();
    this.props.fetchStackTitles();
  }
  
  onDeleteClick(stackID) {
    console.log("onDeleteClick fired inside dashboard-------------", stackID)
    this.props.deleteStack(stackID, () => {
      this.props.fetchStackTitles();
    });
  }

  renderStackTitles() {
    // console.log("renderStackTitles fired-------------");
    // console.log('this props stacktitles is ',this.props.stack_titles)
    return _.map(this.props.stack_titles, stackTitleItem => {
      let theStackID = stackTitleItem.stack_id;
      // console.log('stack id render ---------',theStackID)
      // console.log('here is the statck object that is going through the lodash map inside render stacks', stackTitleItem)
      return (

        <ListGroupItem >
           <Link to={`/stacks/${stackTitleItem.stack_id}`}>
              {stackTitleItem.stack_title}
          </Link>
              <Button bsStyle="danger" onClick={()=> this.onDeleteClick(stackTitleItem.stack_id)}>Delete</Button>
        </ListGroupItem>

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

        <Navbar/>

        <h3>Here are your Stacks</h3>
        
        <ul className="list-group">

        <ListGroup>
   
          {this.renderStackTitles()}
  
        </ListGroup>
        <Form inline>
        <FormControl 
        placeholder = 'Stack Title'
        onChange = { event => this.setState({ title: event.target.value})}
        />
        <Button onClick={ 
          () => this.props.createStack(this.state.title, () => {
            this.props.fetchStackTitles()  } ) 
                        }>Create New Stack</Button>
      </Form>
      {/* this.props.history.push("/dashboard") */}
                
                  <h2>{this.state.title}</h2>

        
          
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

export default connect(mapStateToProps, { fetchStacks, fetchStackTitles, createStack, deleteStack })(Dashboard);
