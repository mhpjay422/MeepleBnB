import { connect } from 'react-redux';
import { fetchListing } from '../../actions/listing_actions';
import ListingDetail from './listing_detail';
import { fetchListings } from '../../actions/listing_actions';
import {
         fetchListingReviews,
         updateReview,
         createReview, 
         deleteReview
} from '../../actions/review_actions';

const msp = (state, { match }) => {
  const listingId = parseInt(match.params.listingId);
  const listing =  state.entities.listings[listingId] || {};
  const hostReviews = state.entities.reviews.host_reviews;
  const cloneReviews = Object.assign({}, state.entities.reviews);
  delete cloneReviews["host_reviews"];
  const reviews = Object.values(cloneReviews);
  const stayOptions = state.entities.stayOptions
  return { listing, listingId, reviews, hostReviews, stayOptions};
};

const mdp = dispatch => {
  return ({
  fetchStayOptions: (options) => dispatch(fetchStayOptions(options)),
  fetchListing: id => dispatch(fetchListing(id)), 
  fetchListingReviews: id => dispatch(fetchListingReviews(id)), 
  updateReview: (id, review) => dispatch(updateReview(id, review)),
  createReview: review => dispatch(createReview(review)),
  deleteReview: id => dispatch(deleteReview(id)),
  });

}

export default connect(msp, mdp)(ListingDetail);
