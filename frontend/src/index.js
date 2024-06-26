import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main'; // Ensure correct path to Main.js
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
