import React from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import {test} from './ducks/reducer_stacks'
let socket;

class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        socket: '',
        baseURL: `/test`,
        username: '',
        inputValue: '',
        messages: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.username = this.username.bind(this);
    }
  
    componentDidMount() {
      socket = socketIOClient(this.state.baseURL);
      
      socket.on('get chat for test', (msg) => {
          console.log('got mesg', msg)
        this.setState({
          messages: [...this.state.messages, msg]
        })
      })
      this.setState({socket});
    }

  
    username(e) {
      this.setState({ username: e.target.value})
    }
  
    handleChange(e) {
      this.setState({
        inputValue: e.target.value
      })
    }
  
    sendMessage(e) {
      e.preventDefault();
      if (this.state.username === '') {
        alert('enter username')
        return;
      }
      this.state.socket.emit('new message', {msg: this.state.inputValue, username: this.state.username})
      this.setState({inputValue: ''})
    }
  
    render() {
      console.log(this.props)
      let messages = this.state.messages.map( (msg, i) => {
        return <p key={ i }>{msg.username}: { msg.msg }</p>;
      })
      return (
        <div className="App">
            <h1 onClick={()=> this.props.test('new value being sent to action creator and reducer and coming back here as state.stacks.test and being assigned to prop dummyText')}>/test</h1>
            {JSON.stringify(this.props.dummyText, null, 2)}
          <h2>React/socket.io Chats</h2>
          <input onChange={this.username} placeholder='username' type='' className=''/>
          <form onSubmit={ this.sendMessage.bind(this) }>
            <input 
              onChange={ this.handleChange }
              value={ this.state.inputValue }
              type='' className=''/>
            <button
              type='submit' 
              className=''>connect</button>
          </form>
         { messages }
        </div>
      );
    }
  }
function mapStateToProps(state){
  console.log(state.stacks.test)
  return {
    dummyText: state.stacks.test
  }
}
  export default connect (mapStateToProps, {test})(Test)