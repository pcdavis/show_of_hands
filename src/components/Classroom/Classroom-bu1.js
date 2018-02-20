// The redux component pattern boils down to this - we need to pass state object and action object into the connect function. To do that,we need to get the actions and state set up into objects ready to pass to connect. Here's how:
// 1. import the Action Creators from the reducer
// 2. near the bottom create an object called actions and place the action creators you imported into the action object as matching key value pairs 
// 3. create function mapStatesToProps that takes the state as an argument and returns the state - which itself is an object
// 4. create insAndOuts as an invocation of connect and pass in mapStatesTopProps as the state object and actions as the actions object. This wraps all the props and actions in Redux's connect, which allows all the magic to happen
// 5. Export the default component as usual, but passed in as an argument to insAndOuts i.e. export default insAndOuts(ComponentName); 
// Last, but not least, inside the component's render function - deconstruct the this.props into constants that represent states and actions that you can use in the jsx to subscribe to state changes or communicate actions to the reducer.

// replace generic items check pathways
import React, { Component } from "react";
import {connect} from 'react-redux'
//import "./Component.css";
// import {generic_action} from '../ducks/reducer';//check name of reducer
// import reducer from "./Redux-tricks-techniques";

class Classroom extends Component {
    render(){
        //deconstruct props to get subscription items or action items and use the variable names instead of typing out this.props.whatever -"whatever" comes from mapStateToProps - the variable name you gave the state property you want to subscribe toz 
        //const {generic_action, generic_stateItem} = this.props;
        return (
            <div className='generic_wrapper'>

                <h1>Welcome to the Classroom</h1>

            </div>
        );//end return
    }//end render
}//end component

//create an action object that gets passed to connect
// const mapDispatchToProps = {
//     generic_action: generic_action
//   }

//   function mapStateToProps(state){
//     console.log(state)
//     return state // this returns the entire state object. Most times you DO NOT need whole state, so get parts of it like so:
//     whatever: state.nameOfPropInStateObj // subscribe to some state property and assign it to 'whatever' variable name you want. To use it you call this.props.whatever. Or you can deconstruct the props like I do at the top of the code with {whatever, x, y, z} = this.props.
//   }
  
//   let insAndOuts = connect(mapStateToProps, mapDispatchToProps); //wraps actions in dispatch

function mapStateToProps(state) {
    return { 
      stacks: state.stack_content.stacks,
      stack_titles: state.stack_content.stackTitles };
  }
  
  export default connect(mapStateToProps, null )(Classroom);
  
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Classroom);



// // Alternative functional component that only does actions, you pass null into the connect

// export default connect (null, {genericAction: genericAction})(Classroom) // this method just descructures the action object and passes it in as the second argument. Or you can bundle all the action objects into an object called mapDispatchToProps and pass that in as the second argument to connect
// export default connect (null, mapDispatchToProps)(Classroom)


// //Udemy course did the following differently:
// // in the import statements used bindActionCreators;
// import { bindActionCreators } from 'redux';

// //In the mapDispatchToProps he did this:
// function mapDispatchToProps(dispatch){
//     bindActionCreators({actionCreator1}, dispatch );
// }
// export default connect( null, mapDispatchToProps )(ComponentName)
