import { connect } from 'react-redux';
import {fetchListings} from '../../actions/listing_actions';
import { fetchReviews} from '../../actions/review_actions';
import { fetchStayOptions } from '../../actions/stay_options_actions';
import ListingIndex from './listing_index.jsx';
import { updateFilter } from '../../actions/filter_actions';
import { withRouter } from "react-router-dom";
import { updateStayOptions } from '../../actions/stay_options_actions';


const msp = (state) => {
  debugger
  const listings = Object.values(state.entities.listings)
  const searchTerm = state.entities.stayOptions.searchTerm
  const priceRange = state.entities.stayOptions.priceRange
  const priceRangeMin = priceRange[0];
  const priceRangeMax = priceRange[1];
  const filteredListings = () => {
    let list = [];
  
    listings.forEach(function (listing) {
      const searched = listing.address.toLowerCase().includes(searchTerm.toLowerCase());
      const inPriceRange = (listing.price > priceRangeMin) && (listing.price < priceRangeMax)
      const matched = searched && inPriceRange
      const noZipArray = listing.address.split(" ");
      const noZip = noZipArray.slice(0, noZipArray.length - 1);
      const newAddress = noZip.join(" ");
      const newList = Object.assign({}, listing);
      newList.address = newAddress
      
      if (matched) {
        list.push(newList);
      }
    });
  
    if (list.length) {
      return list;
    } else {
      return listings;
    }
  }

  return { 
    listings: listings,
    allReviews: Object.values(state.entities.reviews),
    stayOptions: state.entities.stayOptions, 
    filteredList: filteredListings()
  }
};

const mdp = dispatch => ({
  fetchStayOptions: (options) => dispatch(fetchStayOptions(options)),
  fetchListings: () => dispatch(fetchListings()),
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
  fetchReviews: (id) => dispatch(fetchReviews(id)),
  updateStayOptions: (value) => dispatch(updateStayOptions(value)),

});

export default withRouter(connect(msp,mdp)(ListingIndex));
