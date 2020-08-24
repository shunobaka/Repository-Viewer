import { combineReducers } from 'redux';
import user from './user';
import repository from './repository';
import alert from './alert';

export default combineReducers({ user, repository, alert });
