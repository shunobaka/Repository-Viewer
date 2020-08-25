import githubApi from '../utils/githubApi';
import {
  repositoriesLoaded,
  repositoriesFiltered,
} from '../actions/repository';
import { setAlert } from '../actionCreators/alert';

const getRepositoriesForUser = (username) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/users/${username}/repos`);
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
