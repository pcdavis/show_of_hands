import React from '../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import ReactDOM from '../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-dom';
import { Provider } from "../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-redux";
import { BrowserRouter } from "../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-router-dom";
import store from './store';

import './index.css';
import App from './components/App/App';



ReactDOM.render(
    <BrowserRouter>
       <Provider store={ store }>
        <App />
      </Provider>
  </BrowserRouter>, 
document.getElementById('root'));



