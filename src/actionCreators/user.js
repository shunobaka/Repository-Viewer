import githubApi from '../utils/githubApi';
import { usersLoaded, userLoaded } from '../actions/user';
import { addAlert } from '../actions/alert';

const getUsers = (nameQuery) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/search/users?q=${nameQuery}`);

    const payload = res.data.items.map((item) => ({
      username: item.login,
      avatar: item.avatar_url,
      id: item.id,
    }));

    return dispatch(usersLoaded(payload, nameQuery));
  } catch (err) {
    return dispatch(addAlert(err.msg));
  }
};

// TODO: Get user info, not repositories
const getUser = (username) => async (dispatch) => {
  try {
    const res = await githubApi.get(`/users/${username}/repos`);

    return dispatch(userLoaded(res));
  } catch (err) {
    return dispatch(addAlert(err.msg));
  }
};

export default {
  getUsers,
  getUser,
};
