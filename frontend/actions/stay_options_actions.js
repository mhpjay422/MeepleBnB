import * as APIUtil from "../util/stay_options_api_util";
export const RECEIVE_STAY_OPTIONS = "RECEIVE_STAY_OPTIONS";
export const UPDATE_STAY_OPTIONS = 'UPDATE_STAY_OPTIONS';

export const receiveStayOptions = options => ({
  type: RECEIVE_STAY_OPTIONS,
  options
});

export const changeStayOptions = (value) => ({
  type: UPDATE_STAY_OPTIONS,
  value
});

export const updateStayOptions = (value) => (dispatch) => {
  dispatch(changeStayOptions(value));
};

export const fetchStayOptions = () => dispatch => {
  return APIUtil.fetchStayOptions().then(payload => {

    return dispatch(receiveStayOptions(payload))
  });
}