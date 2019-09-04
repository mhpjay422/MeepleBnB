import { connect } from 'react-redux';
import Searchbar from './searchbar.jsx';


const msp = state => ({
    listings: Object.values(state.entities.listings),
});

const mdp = dispatch => ({
    fetchListings: () => dispatch(fetchListings()),
});

export default connect(msp,mdp)(Searchbar);