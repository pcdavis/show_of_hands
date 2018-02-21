import React, { Component } from 'react';
import { subscribeToTimer, messenger } from './api';
import { Form, FormControl, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

class StudentView extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
    this.state = {
      timestamp: 'no timestamp yet',
        message: '',
        broadcast_code: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(){
      console.log('sendmessage fired')
    //   let msg = this.state.message
    messenger((err, serverResponse) => {
        console.log(serverResponse)
        // let broadcastObj = {
        //     broadcast_id: serverResponse.broadcast_id,
        //     broadcast_code: serverResponse.broadcast_code
        // }
        // this.setState({
        //     broadcast_code: broadcastObj.broadcast_code
        // })
    })
  }

  render() {
    return (
      <div className="StudentView">
      <h1>Welcome to the Student View </h1>
        
                      
                    <h1>This is the timer value: {this.state.timestamp} </h1>   
                    <h2>{this.state.broadcast_code}</h2>
                     <Form inline>
        <FormControl 
            placeholder = 'Send a message to the teacher'
            onChange = { event => this.setState({ message: event.target.value})}
            />
        <Button onClick={() => this.sendMessage()}>Send Message to Teach</Button>
        <h3>{this.state.message}</h3>
        </Form> 
      </div>
    );
  }
}

export default StudentView;
