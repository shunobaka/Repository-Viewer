import { addAlert, removeAlert } from '../actions/alert';
import uuid from '../utils/uuid';

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

export default {
  setAlert,
};
