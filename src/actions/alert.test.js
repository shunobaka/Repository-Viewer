/**
 * @fileoverview Defines unit test for alert actions.
 */
import { addAlert, removeAlert, clearAlerts } from './alert';
import { ADD_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from './types';

const mockAlert = {
  message: 'Test',
  id: 0,
};

describe('addAlert', () => {
  it('sets correct type', () => {
    const action = addAlert(mockAlert);

    expect(action.type).toEqual(ADD_ALERT);
  });

  it('sets correct payload', () => {
    const action = addAlert(mockAlert);

    expect(action.payload).toBe(mockAlert);
  });
});

describe('removeAlert', () => {
  it('sets correct type', () => {
    const action = removeAlert(mockAlert.id);

    expect(action.type).toEqual(REMOVE_ALERT);
  });

  it('sets correct payload', () => {
    const action = removeAlert(mockAlert.id);

    expect(action.payload).toBe(mockAlert.id);
  });
});

describe('clearAlerts', () => {
  it('sets correct type', () => {
    const action = clearAlerts();

    expect(action.type).toEqual(CLEAR_ALERTS);
  });

  it('has no payload', () => {
    const action = clearAlerts();

    expect(action.payload).toBeUndefined();
  });
});
