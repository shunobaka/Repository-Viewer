/**
 * @fileoverview Defines a reducer that combines all reducers used by the application.
 */
import { combineReducers } from 'redux';

import repository from './repository';
import alert from './alert';
import user from './user';

export default combineReducers({ user, repository, alert });
