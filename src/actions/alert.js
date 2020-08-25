/**
 * @fileoverview Defines functions that return action objects used by redux to
 *    update alert state.
 */
import { ADD_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from './types';

/**
 * Returns a redux action object based on the provided alert object.
 * @param {object} alert An object representing an alert with fields message and id
 * @return {object} Redux action object
 * @export
 */
export const addAlert = (alert) => {
  return {
    type: ADD_ALERT,
    payload: alert,
  };
};

/**
 * Returns a redux action object used to remove the alert with the provided id.
 * @param {string} id The uuid of the alert that is to be removed
 * @return {object} Redux action object
 * @export
 */
export const removeAlert = (id) => {
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};

/**
 * Returns a redux action object used to remove all alerts.
 * @return {object} Redux action object
 * @export
 */
export const clearAlerts = () => {
  return {
    type: CLEAR_ALERTS,
  };
};
