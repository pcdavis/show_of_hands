import React, { Component } from "react";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
// import socketIOClient from 'socket.io-client';
import socketConnect from 'socket.io-react'

// import {test} from '../../ducks/reducer_stacks';
import {checkIsTeacher} from '../../actions/index';

// let socket;


class SocketRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket: '',
            isTeacher: false,
            username: '',
            inputValue: '',
            messages: []
        }
    }

    componentWillMount() {
        if (this.props.checkIsTeacher()) {
        this.setState({ isTeacher: true})
        }
    }
//----------------Socket items from Joe's test page -------------------
    // componentDidMount() {
    //     socket = socketIOClient(this.state.baseURL);
        
    //     socket.on('get chat for test', (msg) => {
    //         console.log('got mesg', msg)
    //       this.setState({
    //         messages: [...this.state.messages, msg]
    //       })
    //     })
    //     this.setState({socket});
    //   }

    //   username(e) {
    //     this.setState({ username: e.target.value})
    //   }
    
    //   handleChange(e) {
    //     this.setState({
    //       inputValue: e.target.value
    //     })
    //   }
    
    //   sendMessage(e) {
    //     e.preventDefault();
    //     if (this.state.username === '') {
    //       alert('enter username')
    //       return;
    //     }
    //     this.state.socket.emit('new message', {msg: this.state.inputValue, username: this.state.username})
    //     this.setState({inputValue: ''})
    //   }
//------------------End of test items from Joe's test page ------------------------

//My method to determine which UI to show: teacher or student
    uiToDisplay () {
        if(this.state.isTeacher){
            return (
                <h1>The Teacher UI </h1>
            );
        }
        return (
            <h1>The Student UI </h1>
        );
    }

    render(){

         

        return(
           <div> 
               <h1>Welcome to the Socketroom</h1>
           {this.uiToDisplay()}
           </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        isTeacher: state.SocketRoom.isTeacher,
        dummyText: state.stacks.test
     };
  }
function mapDispatchToProps(state){
      return {
        test: test,
        checkIsTeacher: checkIsTeacher
      }
  }

  function mapStateToProps(state){
    console.log(state.stacks.test)
    return {
      dummyText: state.stacks.test
    }
  }

  export default socketConnect(connect(mapStateToProps, mapDispatchToProps)(SocketRoom);
