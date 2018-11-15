import {connect} from 'react-redux';
import React from 'react';
import {login} from '../../actions/session_actions';
import SessionForm from './session_form';
import {Link} from 'react-router-dom';


const msp = (state, ownProps) => {
  return {
    errors: [state.errors],
    formType: "Login",
    navLink: <Link to="/signup">jump to sign up</Link>,
  };
};

const mdp = (dispatch) => {
  return {
    processForm: (user) => dispatch(login({user: user}))
  };
};

export default connect(msp, mdp)(SessionForm);
