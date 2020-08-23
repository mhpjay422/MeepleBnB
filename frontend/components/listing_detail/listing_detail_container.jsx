import { connect } from 'react-redux';
import { fetchListing } from '../../actions/listing_actions';
import ListingDetail from './listing_detail';
import { fetchReviews,
         updateReview,
         createReview, 
         deleteReview
} from '../../actions/review_actions';

const msp = (state, { match }) => {
  const listingId = parseInt(match.params.listingId);
  const listing =  state.entities.listings[listingId] || {};
  debugger
  const reviews = Object.values(state.entities.reviews)
  return {listing, listingId, reviews};
};

const mdp = dispatch => {
  return ({
  fetchListing: id => dispatch(fetchListing(id)), 
  fetchReviews: id => dispatch(fetchReviews(id)), 
  updateReview: (id, review) => dispatch(updateReview(id, review)),
  createReview: review => dispatch(createReview(review)),
  deleteReview: id => dispatch(deleteReview(id)),
  });

}

export default connect(msp, mdp)(ListingDetail);
