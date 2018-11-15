import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Greeting from './greeting';

const msp = (state) => {

  return {
    users: state.entities.users[state.session.id],
    loggedIn: Boolean(state.session.id)
  };
};

const mdp  = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(msp, mdp)(Greeting);
