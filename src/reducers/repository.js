/**
 * @fileoverview Defines a reducer used to process redux actions related to repository state.
 */
import { REPOSITORIES_LOADED, REPOSITORIES_FILTERED } from '../actions/types';

/**
 * The initial repository redux state.
 */
const initialState = {
  repositories: [],
  displayed_repositories: [],
  loading: true,
};

/**
 * Returns a new repository state based on current state and provided action.
 * @param {array} state The redux repository state
 * @param {object} action Redux action object
 * @return {array} Updated repository state object
 * @export
 */
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REPOSITORIES_LOADED:
      return {
        repositories: payload,
        displayed_repositories: payload,
        loading: false,
      };
    case REPOSITORIES_FILTERED:
      return {
        ...state,
        displayed_repositories: state.repositories.filter((item) =>
          item.name.toLowerCase().includes(payload.toLowerCase())
        ),
      };
    default:
      return state;
  }
}
