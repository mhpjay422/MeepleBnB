import { connect } from 'react-redux';
import SearchBar from './searchbar.jsx';
import { fetchListings } from '../../actions/listing_actions';
import { updateFilter } from '../../actions/filter_actions';

const msp = state => {
  debugger
  return {
    listings: Object.values(state.entities.listings),
  }
};

const mdp = dispatch => ({
    fetchListings: (filters) => dispatch(fetchListings(filters)),
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
});

export default connect(msp, mdp)(SearchBar);