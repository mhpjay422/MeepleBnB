import { connect } from 'react-redux';
import Splash from './splash';

const msp = (state) => {
  return {
    users: state.entities.users[state.session.id],
    loggedIn: Boolean(state.session.id)
  };
};

const mdp = dispatch => {
  return {}
};

export default connect(msp, mdp)(Splash);
