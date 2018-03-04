import _ from "lodash";
import React, { Component } from "react";
import './dashboard.css'
import { Well, Form, FormControl, Button, ListGroup, ListGroupItem, Fade } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link, History } from "react-router-dom";
import { fetchStacks, createStack, fetchStackTitles, deleteStack } from "../../actions";
import Navbar from '../CustomNavbar/CustomNavbar'
import { StyleSheet, css } from 'aphrodite';


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

        <ListGroupItem className="padding-tb" >
           <Link className={css(styles.font16)} to={`/stacks/${stackTitleItem.stack_id}`}>
              {stackTitleItem.stack_title}
          </Link>
              <Button className="pull-right button-centering"  onClick={()=> this.onDeleteClick(stackTitleItem.stack_id)}>Delete</Button>
        </ListGroupItem>

      );
    });
  }

handleChange(event){
  this.setState({
    title: event.target.value
  })
}

handleClick(){
  this.setState({title: ''}) 
  this.props.createStack(this.state.title, () => {
    this.props.fetchStackTitles()  } )
    
}

  render() {
    console.log('this.props.stacks',this.props.stacks)
    
    return (
      <div>

        <Navbar/>
        <div className="block45"></div>
        <h2>Here are your Stacks</h2>
        
        <ul className="list-group">

        <ListGroup>
   
          {this.renderStackTitles()}
  
        </ListGroup>
        <Well>
          
          <Form inline className="percent-90">
          <FormControl 
          className= "input-tall"
          placeholder = 'New Stack Title'
          onChange = {this.handleChange}
          />
          <Button className={css(styles.purple)} bsSize="large" block onClick={ () => this.handleClick()}>Create New Stack</Button>
          {/* <Button onClick={ 
            () => this.props.createStack(this.state.title, () => {
              this.props.fetchStackTitles()  } ) 
                          }>Create New Stack</Button> */}
        </Form>
        </Well>
      {/* this.props.history.push("/dashboard") */}
                
                 

        
          
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


const styles = StyleSheet.create({
  purple: {
      backgroundColor: 'rgb(105, 32, 101)',
      color: 'white'
  },

  font16: {
      fontSize: 18,
      color: 'purple'
  }
});