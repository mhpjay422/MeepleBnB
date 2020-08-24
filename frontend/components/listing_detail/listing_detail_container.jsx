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
  const hostReviews = state.entities.reviews.host_reviews
  const cloneReviews = Object.assign({}, state.entities.reviews)
  delete cloneReviews["host_reviews"]
  const reviews = Object.values(cloneReviews)
  return {listing, listingId, reviews, hostReviews};
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
