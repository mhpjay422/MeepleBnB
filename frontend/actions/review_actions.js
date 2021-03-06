import * as ReviewAPIUtil from "../util/review_api_util";


export const RECEIVE_ALL_REVIEWS = "RECEIVE_ALL_REVIEWS";
export const RECEIVE_LISTING_REVIEWS = "RECEIVE_LISTING_REVIEWS";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";
export const CLEAR_REVIEW_ERRORS = "CLEAR_REVIEW_ERRORS";
export const DELETE_REVIEW = "DELETE_REVIEW";

const receiveReviews = reviews => {
  return {
    type: RECEIVE_ALL_REVIEWS,
    reviews, 
  };
};

const receiveListingReviews = reviews => {
  return {
    type: RECEIVE_LISTING_REVIEWS,
    reviews, 
  };
};

const receiveReview = review => {
  return {
    type: RECEIVE_REVIEW,
    review
  };
};

const removeReview = id => {
  return {
    type: DELETE_REVIEW,
    reviewId: id
  };
};

const receiveReviewErrors = errors => {
  return {
    type: RECEIVE_REVIEW_ERRORS,
    errors
  };
};

export const clearReviewErrors = () => {
  return {
    type: CLEAR_REVIEW_ERRORS
  };
};


export const fetchReviews = (listingId) => dispatch => {
  
  return ReviewAPIUtil.fetchReviews(listingId).then(payload => {
    
    return dispatch(receiveReviews(payload));
  });
};

export const fetchListingReviews = (listingId) => dispatch => {
  
  return ReviewAPIUtil.fetchListingReviews(listingId).then(payload => {
    
    return dispatch(receiveListingReviews(payload));
  });
};

export const updateReview = (id, review) => dispatch => {
  return ReviewAPIUtil.updateReview((id, review)).then(payload => {
    return dispatch(receiveReview(payload));
  });
};

export const createReview = review => dispatch => {
  return ReviewAPIUtil.createReview(review).then(
    payload => dispatch(receiveReview(payload)),
    err => dispatch(receiveReviewErrors(err.responseJSON))
  );
};

export const deleteReview = (listingId, id) => dispatch => {
  return ReviewAPIUtil.deleteReview(listingId, id).then(payload => {
    return dispatch(removeReview(payload));
  });
};