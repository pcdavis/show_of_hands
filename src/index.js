import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
// import store from './store';

import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';





ReactDOM.render(
    <HashRouter>
        
          <App />
        
  </HashRouter>, 
document.getElementById('root'));
registerServiceWorker();


//final version should look like this
// ReactDOM.render(
//   <BrowserRouter>
//       <Provider store={ store }>
//         <App />
//       </Provider>
// </BrowserRouter>, 
// document.getElementById('root'));
// registerServiceWorker();