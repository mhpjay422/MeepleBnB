import { connect } from 'react-redux';
import Navbar from './navbar';

const msp = (state) => {
  return {
    stayOptions: state.entities.stayOptions
  };
};

const mdp = dispatch => {
  return {};
};

export default connect(msp, mdp)(Navbar);
