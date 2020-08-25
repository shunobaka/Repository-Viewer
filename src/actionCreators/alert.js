/**
 * @fileoverview Contains functions which dispatch actions related to alert messages.
 */
import { addAlert, removeAlert, clearAlerts } from '../actions/alert';
import uuid from '../utils/uuid';

/**
 * Dispatches an action used to create a new alert. If remove param is true,
 * after certain time passes dispatches an action to remove the alert.
 * @param {string} message The message of the alert
 * @param {boolean} remove Whether the alert should be removed after timeout
 * @param {number} timeout Amount of time in ms before the alert is removed
 * @export
 */
export const setAlert = (message, remove = true, timeout = 5000) => async (
  dispatch
) => {
  const id = uuid();
  const alert = {
    message,
    id,
  };

  dispatch(addAlert(alert));

  if (remove) {
    setTimeout(() => dispatch(removeAlert(id)), timeout);
  }
};

/**
 * Dispatches an action used to clear all alerts.
 * @export
 */
export const removeAlerts = () => async (dispatch) => {
  dispatch(clearAlerts());
};

export default {
  setAlert,
  removeAlerts,
};
