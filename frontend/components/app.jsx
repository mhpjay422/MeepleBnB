import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import LogInFormContainer from './session_form/login_form_container';
import SignUpFormContainer from './session_form/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash_page/splash_container';
import Modal from './modal/modal';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Modal />
      <div className="main">
          <AuthRoute exact path="/" component={SplashContainer}/>
          <Route path="/greeting" component={GreetingContainer} />
      </div>
    </div>
  );
};

export default App;
