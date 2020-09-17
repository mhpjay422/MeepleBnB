import * as APIUtil from "../util/stay_options_api_util";
export const RECEIVE_STAY_OPTIONS = "RECEIVE_STAY_OPTIONS";

export const receiveStayOptions = options => ({
  type: RECEIVE_STAY_OPTIONS,
  options
});

export const fetchStayOptions = (options) => dispatch => {
  return APIUtil.fetchStayOptions(options).then(payload => {

    return dispatch(receiveStayOptions(payload))
  });
}