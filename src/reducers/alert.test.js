import alertReducer from './alert';
import { ADD_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../actions/types';

const mockAlerts = [
  {
    message: 'Test',
    id: 0,
  },
  {
    message: 'Test2',
    id: 1,
  },
];

describe('ADD_ALERT type', () => {
  const type = ADD_ALERT;
  const payload = mockAlerts[0];
  const initialState = [];

  it('ADD_ALERT action type adds alert', () => {
    const newState = alertReducer(initialState, { type, payload });

    expect(newState).toContain(payload);
  });

  it('ADD_ALERT action type returns new object', () => {
    const newState = alertReducer(initialState, { type, payload });

    expect(newState).not.toBe(initialState);
  });
});

describe('REMOVE_ALERT type', () => {
  const type = REMOVE_ALERT;
  const initialState = mockAlerts;

  it('REMOVE_ALERT action type removes correct alert', () => {
    const newState = alertReducer(initialState, {
      type,
      payload: mockAlerts[0].id,
    });

    expect(newState).not.toContain(mockAlerts[0]);
    expect(newState).toContain(mockAlerts[1]);
  });

  it('REMOVE_ALERT action type with no matching alert does nothing', () => {
    const newState = alertReducer(initialState, {
      type,
      payload: -1,
    });

    expect(newState).toContain(mockAlerts[0]);
    expect(newState).toContain(mockAlerts[1]);
    expect(newState.length).toBe(initialState.length);
  });

  it('REMOVE_ALERT action type returns new object', () => {
    const newState = alertReducer(initialState, {
      type,
      payload: -1,
    });

    expect(newState).not.toBe(initialState);
  });
});

describe('CLEAR_ALERTS type', () => {
  const type = CLEAR_ALERTS;
  const initialState = mockAlerts;

  it('CLEAR_ALERTS action type removes single alert', () => {
    const newState = alertReducer([mockAlerts[0]], {
      type,
    });

    expect(newState).not.toContain(mockAlerts[0]);
    expect(newState).not.toContain(mockAlerts[1]);
    expect(newState.length).toBe(0);
  });

  it('CLEAR_ALERTS action type removes all alerts', () => {
    const newState = alertReducer(initialState, {
      type,
    });

    expect(newState).not.toContain(mockAlerts[0]);
    expect(newState).not.toContain(mockAlerts[1]);
    expect(newState.length).toBe(0);
  });

  it('CLEAR_ALERTS action type returns new object', () => {
    const newState = alertReducer(initialState, {
      type,
    });

    expect(newState).not.toBe(initialState);
  });
});

describe('default case', () => {
  const initialState = mockAlerts;

  it('default case returns same state', () => {
    const initialStateCopy = [...initialState];
    const newState = alertReducer(initialState, {
      type: 'INVALID_TYPE',
    });

    /** Ensure the state does not change */
    expect(newState).toEqual(initialStateCopy);
    /** Ensure the returned object is the initial one */
    expect(newState).toBe(initialState);
  });
});
