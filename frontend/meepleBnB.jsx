import React from 'react';
import ReactDOM from 'react-dom';
import * as SessionUtil from './util/session_api_util';
// import Root from './components/root';
// import configureStore from './store/store';




document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<h1>Welcome to MeepleBnB</h1>, document.getElementById('root'));
});

window.signup = SessionUtil.signup;
window.login = SessionUtil.login;
window.logout = SessionUtil.logout;
