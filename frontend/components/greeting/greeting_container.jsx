import { connect } from 'react-redux';
import { login, logout, demoLogin } from '../../actions/session_actions';
import Greeting from './greeting';

const msp = (state) => {

  return {
    users: state.entities.users[state.session.id],
    loggedIn: Boolean(state.session.id)
  };
};

const mdp  = dispatch => {
  return {
    logout: () => dispatch(logout()),
    demoLogin: () => dispatch(demoLogin(
      {user: {username: "demoUser", email: "demoUser@gmail.com", password: "starwars"}}
    ))
  };
};

export default connect(msp, mdp)(Greeting);
