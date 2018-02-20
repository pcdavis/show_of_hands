import React, { Component } from "react";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
// import socketIOClient from 'socket.io-client';

// import {test} from '../../ducks/reducer_stacks';
import {checkIsTeacher} from '../../actions/index';

// let socket;


class SocketRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            // socket: '',
            isTeacher: false,
            username: '',
            inputValue: '',
            messages: []
        }
    }

    componentWillMount() {
        if (this.props.teacherID == this.props.stacks) {
        this.setState({ isTeacher: true},console.log(this.state.isTeacher))
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
      stacks: state.stack_content.stacks,
      teacherID: state.stack_content.teacherID,
      stack_titles: state.stack_content.stackTitles };
  }
  
// function mapDispatchToProps(state){
//       return {
//         // test: test,
//         checkIsTeacher: checkIsTeacher
//       }
//   }


  
    export default connect (mapStateToProps, null)(SocketRoom)
    // export default SocketRoom;