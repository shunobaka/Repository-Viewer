import { REPOSITORIES_LOADED, REPOSITORIES_FILTERED } from './types';

export const repositoriesLoaded = (repos) => {
  return {
    type: REPOSITORIES_LOADED,
    payload: repos,
  };
};

export const repositoriesFiltered = (query) => {
  return {
    type: REPOSITORIES_FILTERED,
    payload: query,
  };
};
