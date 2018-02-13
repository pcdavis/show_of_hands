import React, { Component } from 'react';
import './App.css';
import routes from '../../routes'

class App extends Component {
  render() {
    return (
      <div className="App">        
        {routes}
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
