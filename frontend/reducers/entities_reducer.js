import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import listingsReducer from './listings_reducer';
import bookingsReducer from './bookings_reducer';

const entitesReducer = combineReducers({
  users: usersReducer,
  listings: listingsReducer,
  bookings: bookingsReducer,
});

export default entitesReducer;
