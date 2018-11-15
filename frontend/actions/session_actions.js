import * as SessionUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

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
    type: RECEIVE_ERRORS,
    errors
  };
};

export const login = (user) => dispatch => {
  return SessionUtil.login(user).then(payload => dispatch(receiveCurrentUser(payload)))
};

export const logout = (id) => dispatch => {
  return SessionUtil.logout(id).then(payload => dispatch(removeCurrentUser(payload)));
};

export const signup = (user) => dispatch => {
  return SessionUtil.signup(user).then(payload => dispatch(receiveCurrentUser(payload)));
};
