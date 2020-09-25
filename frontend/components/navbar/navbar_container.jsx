import { connect } from 'react-redux';
import { login, logout, demoLogin } from '../../actions/session_actions';
import Navbar from './navbar';

const msp = (state) => {

  return {
    users: state.entities.users[state.session.id],
    loggedIn: Boolean(state.session.id),
    stayOptions: state.entities.stayOptions
  };
};

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(msp, mdp)(Navbar);
