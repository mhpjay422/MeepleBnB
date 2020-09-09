import { RECEIVE_BOOKING_ERRORS,
         CLEAR_BOOKING_ERRORS } from '../actions/booking_actions';
import {
  merge
} from "lodash";

const bookingErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BOOKING_ERRORS:
      return merge({}, state, action.errors);
    case CLEAR_BOOKING_ERRORS:
      return [];
    default:
      return state;
  }
};

export default bookingErrorsReducer;
