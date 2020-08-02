import {connect} from 'react-redux';
import React from 'react';
import {login, demoLogin, clear} from '../../actions/session_actions';
import SessionForm from './session_form';
import {Link} from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';


const msp = (state, ownProps) => {
  return {
    errors: state.errors.session,
    formType: "Log in",
  };
};
  const demoUser = {user: {
    username: "demoUser",
    email: "demoUser@gmail.com",
    password: "starwars"}};


const mdp = (dispatch) => {
  return {
    processForm: (user) => dispatch(login({user: user})),
    closeModal: () => dispatch(closeModal()),
    clear: () => dispatch(clear()),
    otherForm: (
      <button
        className="or-otherform"
        onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    demoLogin: () => dispatch(login(demoUser)),
  };
};

export default connect(msp, mdp)(SessionForm);
