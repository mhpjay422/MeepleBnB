import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, demoLogin, clear } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Signup',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup({user})),
    closeModal: () => dispatch(closeModal()),
    clear: () => dispatch(clear()),
    otherForm: (
      <button
        className="or-otherform"
        onClick={() => dispatch(openModal('login'))}>
        Log in
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

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
