import { connect } from 'react-redux';
import { login, logout, demoLogin } from '../../actions/session_actions';
import ModalButton from './modal_button';
import { openModal } from '../../actions/modal_actions';

const msp = (state) => {
  return {

  };
};

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
    demoLogin: () => dispatch(demoLogin(
      {
        user: {
          username: "demoUser",
          email: "demoUser@gmail.com",
          password: "starwars"
        }
      }
    ))
  };
};

export default connect(msp, mdp)(ModalButton);