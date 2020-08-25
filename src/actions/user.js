/**
 * @fileoverview Defines functions that return action objects used by redux to
 *    update user state.
 */
import { USERS_SEARCH_RESULT, USER_LOADED } from './types';

/**
 * Returns a redux action object used to save users and username query in state
 *    based on the provided users and query.
 * @param {array} users User objects to be saved in the redux state
 * @param {*} query The username query by which the users were retrieved
 * @returns Redux action object
 * @export
 */
export const usersLoaded = (users, query) => {
  return {
    type: USERS_SEARCH_RESULT,
    payload: {
      users,
      query,
    },
  };
};

/**
 * Returns a redux action object used to save user in state based on the provided
 *    user.
 * @param {object} user User object to be saved in redux state
 * @returns Redux action object
 * @export
 */
export const userLoaded = (user) => {
  return {
    type: USER_LOADED,
    payload: user,
  };
};
