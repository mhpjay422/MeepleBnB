import { connect } from 'react-redux';
import {fetchListings} from '../../actions/listing_actions';
import ListingIndex from './listing_index.jsx';

const msp = state => ({
  listings: Object.values(state.entities.listings),
});

const mdp = dispatch => ({
  fetchListings: () => dispatch(fetchListings())
});

export default connect(msp,mdp)(ListingIndex);
