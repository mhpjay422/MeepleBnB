import { connect } from 'react-redux';
import { fetchListing } from '../../actions/listing_actions';
import ListingShow from './listing_show';

const msp = (state, { match }) => {
  const listingId = parseInt(match.params.listingId);
  const listing =  state.entities.listings[listingId] || {};
  return {listing, listingId};
};

const mdp = dispatch => ({
  fetchListing: id => dispatch(fetchListing(id))
});

export default connect(msp, mdp)(ListingShow);
