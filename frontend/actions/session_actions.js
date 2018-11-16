import * as SessionUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveCurrentUser = (user) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

const removeCurrentUser = (userId) => {
  return {
    type: REMOVE_CURRENT_USER,
    userId
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const clear = () => dispatch => {
  return dispatch(clearErrors());
};

export const login = (user) => dispatch => {
  return SessionUtil.login(user).then(
    payload => dispatch(receiveCurrentUser(payload)),
   err => dispatch(receiveErrors(err.responseJSON)));
};

export const logout = (id) => dispatch => {
  return SessionUtil.logout(id).then(
    payload => dispatch(removeCurrentUser(payload)),
   err => dispatch(receiveErrors(err.responseJSON)));
};

export const signup = (user) => dispatch => {
  return SessionUtil.signup(user).then(
    payload => dispatch(receiveCurrentUser(payload)),
   err => dispatch(receiveErrors(err.responseJSON)));
};

export const demoLogin = (user) => dispatch => {
  return SessionUtil.login(user).then(
    payload => dispatch(receiveCurrentUser(payload)),
   err => dispatch(receiveErrors(err.responseJSON)));
};
