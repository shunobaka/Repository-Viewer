import { USER_LOADED, USERS_SEARCH_RESULT } from '../actions/types';

const initialState = {
  user: null,
  users: [],
  query: null,
  loading: true,
};

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
