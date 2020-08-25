/**
 * @fileoverview Defines a reducer used to process redux actions related to user state.
 */
import { USER_LOADED, USERS_SEARCH_RESULT } from '../actions/types';

/**
 * The initial user redux state.
 */
const initialState = {
  user: null,
  users: [],
  query: null,
  loading: true,
};

/**
 * Returns a new user state based on current state and provided action.
 * @param {array} state The redux user state
 * @param {object} action Redux action object
 * @return {array} Updated user state object
 * @export
 */
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
      };
    case USERS_SEARCH_RESULT:
      return {
        user: null,
        users: payload.users,
        query: payload.query,
        loading: false,
      };
    default:
      return state;
  }
}
