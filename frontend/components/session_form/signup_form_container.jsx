import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, demoLogin } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'signup',
    navLink: <Link to="/login">log in instead</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup({user: user})),
    demoLogin: () => dispatch(demoLogin(
      {user: {username: "demoUser", email: "demoUser@gmail.com", password: "starwars"}}
    ))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
