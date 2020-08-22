import {
  merge
} from "lodash";
import {
  RECEIVE_ALL_REVIEWS,
  RECEIVE_REVIEW,
  DELETE_REVIEW
} from "../actions/review_actions";
import {
  REMOVE_CURRENT_USER
} from "../actions/session_actions";
import {
  RECEIVE_LISTING
} from "../actions/listing_actions";

const reviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_REVIEWS:
      debugger
      return merge({}, state, action.reviews.reviews);
    case RECEIVE_REVIEW:
      return merge({}, state, action.booking);
    case DELETE_REVIEW:
      const newState = merge({}, state);
      delete newState[action.reviewId];
      return newState;
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default reviewsReducer;