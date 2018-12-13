import { connect } from 'react-redux';
import {fetchListings} from '../../actions/listing_actions';
import ListingIndex from './listing_index.jsx';
import { updateFilter } from '../../actions/filter_actions';


const msp = state => ({
  listings: Object.values(state.entities.listings),
});

const mdp = dispatch => ({
  fetchListings: () => dispatch(fetchListings()),
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
});

export default connect(msp,mdp)(ListingIndex);
