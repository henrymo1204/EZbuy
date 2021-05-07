import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Router from './Router';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/commons/auth';
import './components/commons/appState';

ReactDOM.render(

  <div>
    <ToastContainer
      position="top-right"
      autoClose={7000}
      // hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
