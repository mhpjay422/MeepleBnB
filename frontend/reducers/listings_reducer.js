import merge from "lodash/merge";

import { RECEIVE_LISTINGS, RECEIVE_LISTING } from "../actions/listing_actions";

const listingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return action.listings;
    case RECEIVE_LISTING:
      const listing = { [action.listing.id]: action.listing };
      return merge({}, state, listing);
    default:
      return state;
  }
};

export default listingsReducer;
