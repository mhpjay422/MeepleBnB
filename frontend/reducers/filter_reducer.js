import { merge } from 'lodash';
import { UPDATE_FILTER } from '../actions/filter_actions';

const defaultFilters = Object.freeze({
  bounds: {},
});

const filtersReducer = (state = defaultFilters, action) => {
  Object.freeze(state);
  if (action.type === UPDATE_FILTER) {
    return merge({}, state, { [action.filter]: action.value });
  } else {
    return state;
  }
};

export default filtersReducer;
