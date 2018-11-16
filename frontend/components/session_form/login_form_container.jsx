import {connect} from 'react-redux';
import React from 'react';
import {login, demoLogin, clear} from '../../actions/session_actions';
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
    closeModal: () => dispatch(closeModal()),
    clear: () => dispatch(clear()),
    otherForm: (
      <button
        onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    demoLogin: () => dispatch(demoLogin(
      {user: {
        username: "demoUser",
        email: "demoUser@gmail.com",
        password: "starwars"}}
    )),
  };
};

export default connect(msp, mdp)(SessionForm);
