import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import listingsReducer from './listings_reducer';

const entitesReducer = combineReducers({
  users: usersReducer,
  listings: listingsReducer
});

export default entitesReducer;
