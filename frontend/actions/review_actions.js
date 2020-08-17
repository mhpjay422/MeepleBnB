import * as ReviewAPIUtil from "../util/review_api_util";

export const fetchReviews = (listingId) => dispatch => {
  return ReviewAPIUtil.fetchReviews(listingId).then(payload => {
    return dispatch(receiveReviews(payload));
  });
};

export const updateReview = id => dispatch => {
  return ReviewAPIUtil.updateReview(id).then(payload => {
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