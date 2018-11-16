import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, demoLogin } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Signup',
    navLink: <Link to="/login">Log in</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup({user: user})),
    otherForm: (
      <button onClick={() => dispatch(openModal('login'))}>
        Login
      </button>
    ),
    demoLogin: () => dispatch(demoLogin(
      {user: {
        username: "demoUser",
        email: "demoUser@gmail.com",
        password: "starwars"}}
    )),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
