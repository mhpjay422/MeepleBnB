import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import listingsReducer from './listings_reducer';
import bookingsReducer from './bookings_reducer';
import reviewsReducer from './reviews_reducer';
import stayOptionsReducer from './stay_options_reducer';

const entitesReducer = combineReducers({
  users: usersReducer,
  listings: listingsReducer,
  bookings: bookingsReducer,
  reviews: reviewsReducer, 
  stayOptions: stayOptionsReducer,
});

export default entitesReducer;
