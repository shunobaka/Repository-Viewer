import { ADD_ALERT, REMOVE_ALERT } from './types';

export const addAlert = (alert) => {
  console.log('1');
  return {
    type: ADD_ALERT,
    payload: alert,
  };
};

export const removeAlert = (id) => {
  console.log('2');
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};
