import { ADD_ALERT } from './types';

export const addAlert = (message) => {
  return {
    type: ADD_ALERT,
    payload: message,
  };
};
