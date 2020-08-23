import githubApi from '../utils/githubApi';
import { usersLoaded } from '../actions/user';
import { addAlert } from '../actions/alert';

const getUsers = async (nameQuery) => {
  try {
    const res = await githubApi.get(`/search/users?q=${nameQuery}`);

    return usersLoaded(res, nameQuery);
  } catch (err) {
    return addAlert(err.msg);
  }
};

export default {
  getUsers,
};
