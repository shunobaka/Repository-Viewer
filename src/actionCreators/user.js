import githubApi from '../utils/githubApi';
import { usersLoaded, userLoaded } from '../actions/user';
import { setAlert } from '../actionCreators/alert';

const getUsers = (nameQuery) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/search/users?q=${nameQuery}`);

    const payload = res.data.items.map((item) => ({
      username: item.login,
      avatar: item.avatar_url,
      id: item.id,
      num_repos: item.public_repos,
    }));

    dispatch(usersLoaded(payload, nameQuery));
  } catch (err) {
    dispatch(
      setAlert(
        'There was a problem searching for users, please try again.',
        false
      )
    );
  }
};

const loadUser = (username) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/users/${username}`);

    const user = {
      id: res.data.id,
      username: res.data.login,
      avatar: res.data.avatar_url,
      num_repos: res.data.public_repos,
    };

    dispatch(userLoaded(user));
  } catch (err) {
    dispatch(setAlert('Could not retrieve user, please try again.', false));
  }
};

export default {
  getUsers,
  loadUser,
};
