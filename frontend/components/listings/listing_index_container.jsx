import { connect } from 'react-redux';
import {fetchListings} from '../../actions/listing_actions';
import { fetchReviews} from '../../actions/review_actions';
import { fetchStayOptions } from '../../actions/stay_options_actions';
import ListingIndex from './listing_index.jsx';
import { updateFilter } from '../../actions/filter_actions';
import { withRouter } from "react-router-dom";

const msp = (state) => {

  return { 
    listings: Object.values(state.entities.listings),
    allReviews: Object.values(state.entities.reviews),
    stayOptions: state.entities.stayOptions
  }
};

const mdp = dispatch => ({
  fetchStayOptions: (options) => dispatch(fetchStayOptions(options)),
  fetchListings: () => dispatch(fetchListings()),
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
  fetchReviews: (id) => dispatch(fetchReviews(id))
});

export default withRouter(connect(msp,mdp)(ListingIndex));
