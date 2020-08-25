import { ADD_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from './types';

export const addAlert = (alert) => {
  return {
    type: ADD_ALERT,
    payload: alert,
  };
};

export const removeAlert = (id) => {
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};

export const clearAlerts = () => {
  return {
    type: CLEAR_ALERTS,
  };
};
