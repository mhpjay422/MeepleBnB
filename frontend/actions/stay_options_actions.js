import * as APIUtil from "../util/stay_options_api_util";
export const RECEIVE_STAY_OPTIONS = "RECEIVE_STAY_OPTIONS";

export const receiveStayOptions = options => ({
  type: RECEIVE_STAY_OPTIONS,
  options
});

export const fetchStayOptions = () => dispatch => {
  return APIUtil.fetchStayOptions().then(payload => {

    return dispatch(receiveStayOptions(payload))
  });
}