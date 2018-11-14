import * as SessionUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

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
