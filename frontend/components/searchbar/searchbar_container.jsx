import { connect } from 'react-redux';
import SearchBar from './searchbar.jsx';
import { fetchListings } from '../../actions/listing_actions';
import { updateFilter } from '../../actions/filter_actions';
import { fetchStayOptions } from '../../actions/stay_options_actions';

const msp = state => {
  debugger
  return {
    listings: Object.values(state.entities.listings),
    stayOptions: Object.values(state.entities.stayOptions)
  }
};

const mdp = dispatch => ({
    fetchStayOptions: (options) => dispatch(fetchStayOptions(options)),
    fetchListings: (filters) => dispatch(fetchListings(filters)),
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
});

export default connect(msp, mdp)(SearchBar);