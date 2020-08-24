import { REPOSITORIES_LOADED, REPOSITORIES_FILTERED } from '../actions/types';

// TODO: Check naming
const initialState = {
  repositories: [],
  displayed_repositories: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REPOSITORIES_LOADED:
      return {
        repositories: payload,
        displayed_repositories: payload,
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
