import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import Stack from '../Stack/Stack'
import SocketRoom from '../Classroom/SocketRoom'
// import SocketRoom2 from './components/Classroom/SocketRoom2'
import Test from '../../Test'

class App extends Component {
  render() {
    return (
      <div className="App">        
        
      <h1>Hello to App component </h1>

          <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path='/test' component={Test} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/stacks/:id" component={Stack} />
          <Route exact path="/socketroom" component={SocketRoom} />
          {/* <Route exact path="/socketroom2" component={SocketRoom2} /> */}
        </Switch>
      </div>

      </div>
    );
  }
}

export default App;


//Backup of original App component
// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>

//         <h1>This is the App component</h1>
//                 <a href={ process.env.REACT_APP_LOGIN }><button>Login/Register</button></a>

//       </div>
//     );
//   }
// }

// export default App;
