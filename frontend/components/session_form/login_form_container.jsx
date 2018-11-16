import {connect} from 'react-redux';
import React from 'react';
import {login, demoLogin} from '../../actions/session_actions';
import SessionForm from './session_form';
import {Link} from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';


const msp = (state, ownProps) => {
  return {
    errors: state.errors.session,
    formType: "Login",
  };
};

const mdp = (dispatch) => {
  return {
    processForm: (user) => dispatch(login({user: user})),
    otherForm: (
      <button onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
    demoLogin: () => dispatch(demoLogin(
      {user: {
        username: "demoUser",
        email: "demoUser@gmail.com",
        password: "starwars"}}
    ))
  };
};

export default connect(msp, mdp)(SessionForm);
