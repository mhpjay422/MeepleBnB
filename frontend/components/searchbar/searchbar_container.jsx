import { connect } from 'react-redux';
import SearchBar from './searchbar.jsx';
import { fetchListings } from '../../actions/listing_actions';
import { updateFilter } from '../../actions/filter_actions';
import { updateStayOptions } from '../../actions/stay_options_actions';

const msp = state => {
  return {
    listings: Object.values(state.entities.listings),
  }
};

const mdp = dispatch => ({
    fetchListings: (filters) => dispatch(fetchListings(filters)),
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
    updateStayOptions: (value) => dispatch(updateStayOptions(value)),
});

export default connect(msp, mdp)(SearchBar);