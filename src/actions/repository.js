/**
 * @fileoverview Defines functions that return action objects used by redux to
 *    update repository state.
 */
import { REPOSITORIES_LOADED, REPOSITORIES_FILTERED } from './types';

/**
 * Returns a redux action object used to save repositories in state based on the
 *    provided repositories.
 * @param {array} repos Repository objects to be saved in redux state
 * @return {object} Redux action object
 * @export
 */
export const repositoriesLoaded = (repos) => {
  return {
    type: REPOSITORIES_LOADED,
    payload: repos,
  };
};

/**
 * Returns a redux action object used to filter repositories in state based on the
 *    provided query.
 * @param {string} query The name query by which repositories are filtered
 * @return {object} Redux action object
 * @export
 */
export const repositoriesFiltered = (query) => {
  return {
    type: REPOSITORIES_FILTERED,
    payload: query,
  };
};
