import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { COOKIE_NAME, getCookie, setCookie } from './utilities/cookies';

let userId = getCookie(COOKIE_NAME);
if (!userId) {
  userId = Math.floor(Math.random() * 100000).toString();
  setCookie(COOKIE_NAME, userId);
}

ReactDOM.render(
  <React.StrictMode>
    <App userId={userId} />
  </React.StrictMode>,
  document.getElementById('root')
);
