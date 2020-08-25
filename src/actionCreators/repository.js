/**
 * @fileoverview Contains functions for loading repositories and interacting
 * with loaded repositories. Functions dispatch redux actions.
 */
import githubApi from '../utils/githubApi';
import {
  repositoriesLoaded,
  repositoriesFiltered,
} from '../actions/repository';
import { setAlert } from '../actionCreators/alert';

/**
 * Loads information for the user repositories using the github API
 * @param {string} username The username of the user whose repositories will be loaded.
 */
const getRepositoriesForUser = (username) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/users/${username}/repos`);

    // Maps the repositories from the response to objects with the expected information.
    const payload = res.data.map((item) => ({
      id: item.id,
      name: item.name,
      url: item.html_url,
      description: item.description,
      created_at: item.created_at,
    }));

    dispatch(repositoriesLoaded(payload));
  } catch (err) {
    dispatch(
      setAlert(
        'There was a problem retrieving user repositories, please try again.',
        false
      )
    );
  }
};

const filterRepositories = (query) => (dispatch) => {
  dispatch(repositoriesFiltered(query));
};

export default {
  getRepositoriesForUser,
  filterRepositories,
};
