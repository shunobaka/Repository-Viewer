import { USERS_SEARCH_RESULT, USER_LOADED } from './types';

export const usersLoaded = (users, query) => {
  return {
    type: USERS_SEARCH_RESULT,
    payload: {
      users,
      query,
    },
  };
};

export const userLoaded = (user) => {
  return {
    type: USER_LOADED,
    payload: user,
  };
};
