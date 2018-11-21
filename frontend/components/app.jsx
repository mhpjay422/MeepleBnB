import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import LogInFormContainer from './session_form/login_form_container';
import SignUpFormContainer from './session_form/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash_page/splash_container';
import splash from './splash_page/splash';
import Modal from './modal/modal';
import ListingShowContainer from './listing_show/listing_show_container';
import 'react-dates/initialize';
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
          <Route exact path="/greeting" component={GreetingContainer} />
          <Route path="/listings/:listingId" component={ListingShowContainer} />
      </div>
    </div>
  );
};

export default App;
