

renderQuiz(){
    console.log("renderQuiz fired and this.state.quizOb is ", this.state.newQuizObj)
    const { current_quiz_id, quiz_id, question, correct_answer, false_1, false_2, false_3, broadcast_id } = this.state.newQuizObj
    console.log("Here are the destructured value of this.state.newQuizObj.correct_answer", correct_answer)

    if (this.state.newQuizObj.question) {

       let falseArray = [{text: false_1, key_val: "false_1"},{text: false_2, key_val: "false_2"},{text: false_3, key_val: "false_3"}]
       let correctItem = {text: correct_answer, key_val: "correct_answer"};
       let indexOfCorrect = _.random(0,3);
       let randomAnswerArray = falseArray.splice(indexOfCorrect,0,correctItem)
       console.log(randomAnswerArray)
       let generatedButtons = randomAnswerArray.map( item => {
           retun (
            <Button onClick= { ()=> this.submitAnswer (item.key_val)} > {item.text} </Button>
           )
       })

      return (
        <div>
                <Panel>
                  <Panel.Heading><h2>{question}</h2></Panel.Heading>
                  <Panel.Body>
                    <ButtonGroup vertical block>
                    {generatedButtons}
                </ButtonGroup>;
                </Panel.Body>
            </Panel>
        </div>
      )
    } else {
      return (
        <h2> Waiting for teacher </h2>
      )
    }
} // end of renderQuiz