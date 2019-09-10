import * as APIUtil from "../util/listing_api_util";
export const RECEIVE_LISTINGS = "RECEIVE_LISTINGS";
export const RECEIVE_LISTING = "RECEIVE_LISTING";

export const receiveListings = listings => ({
  type: RECEIVE_LISTINGS,
  listings
});

export const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  listing
});

export const fetchListings = (filters) => dispatch => {
  
  return APIUtil.fetchListings(filters).then(listings => {
    
    return dispatch(receiveListings(listings))});
}
  

export const fetchListing = id => dispatch => {
  return APIUtil.fetchListing(id).then(payload =>
    dispatch(receiveListing(payload))
  );
};

export const createListing = listing => dispatch =>
  APIUtil.createListing(listing).then(payload =>
    dispatch(receiveListing(payload))
  );
