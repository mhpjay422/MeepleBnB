import { merge } from "lodash";
import { RECEIVE_STAY_OPTIONS, UPDATE_STAY_OPTIONS } from "../actions/stay_options_actions";

const stayOptionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_STAY_OPTIONS:
      return merge({}, state, action.value);
    case UPDATE_STAY_OPTIONS:
      return merge({}, state, action.value);
    default:
      return state;
  }
};

export default stayOptionsReducer;