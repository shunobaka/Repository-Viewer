import githubApi from '../utils/githubApi';
import { usersLoaded, userLoaded } from '../actions/user';
import { addAlert } from '../actions/alert';
import store from '../store';

const getUsers = (nameQuery) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/search/users?q=${nameQuery}`);

    const payload = res.data.items.map((item) => ({
      username: item.login,
      avatar: item.avatar_url,
      id: item.id,
      num_repos: item.public_repos,
    }));

    return dispatch(usersLoaded(payload, nameQuery));
  } catch (err) {
    return dispatch(addAlert(err.msg));
  }
};

const loadUser = (username) => async (dispatch) => {
  let user = store.getState().user.users.find((u) => u.username === username);

  if (!user) {
    try {
      const res = await githubApi.get(`/users/${username}`);

      user = {
        id: res.data.id,
        username: res.data.login,
        avatar: res.data.avatar_url,
        num_repos: res.data.public_repos,
      };
    } catch (err) {
      return dispatch(addAlert(err.msg));
    }
  }

  return dispatch(userLoaded(user));
};

export default {
  getUsers,
  loadUser,
};
