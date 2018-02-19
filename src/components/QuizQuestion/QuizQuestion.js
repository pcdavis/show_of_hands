
import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'

class QuizQuestion extends Component {
    constructor(props){
        super(props);
        this.state={
            question: ''
        }
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        console.log("handlesubmit fired")
    }

  render() {
    return (
      <div className="QuizQuestion">        

      <Form inline>
        <FormControl 
        placeholder = 'Quiz question'
        onChange = { event => this.setState({ question: event.target.value})}
        />
        <Button onClick={() => this.handleSubmit()}>Submit</Button>
      </Form>
        
      </div>
    );
  }
}

export default QuizQuestion;