/**
 * @fileoverview Contains unit tests for the alert actionCreater.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import combinedReducer from '../reducers';
import alertActionCreator from './alert';
import { ADD_ALERT } from '../actions/types';

/** Mock uuid used by alerts as crypto is underfined during testing */
jest.mock('../utils/uuid.js');

const mockAlerts = [
  {
    id: 0,
    message: 'Test',
  },
  {
    id: 1,
    message: 'Test 2',
  },
];

/** Simple sleep function to test if alerts are removed when time expires */
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Wrap test code in try catch to remove UnhandledPromiseRejectionWarning which never occurs
 * due to mocked api
 */
try {
  describe('setAlert', () => {
    let store;
    let state;

    beforeEach(() => {
      /** Reset store to initial state */
      store = createStore(combinedReducer, applyMiddleware(thunk));
      state = store.getState();
    });

    it('sets permanent alert correctly', async () => {
      const expireTime = 10;
      expect(state.alert.length).toBe(0);

      await alertActionCreator.setAlert(
        mockAlerts[0].message,
        false,
        expireTime
      )(store.dispatch);

      state = store.getState();

      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(mockAlerts[0].message);

      await sleep(10 * expireTime);
      state = store.getState();

      /** Check to make sure the alert did not expire */
      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(mockAlerts[0].message);
    });

    it('sets expiring alert correctly', async () => {
      const expireTime = 10;
      expect(state.alert.length).toBe(0);

      await alertActionCreator.setAlert(
        mockAlerts[0].message,
        true,
        expireTime
      )(store.dispatch);

      state = store.getState();

      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(mockAlerts[0].message);

      await sleep(10 * expireTime);
      state = store.getState();

      /** Check to make sure the alert expired */
      expect(state.alert.length).toBe(0);
    });
  });

  describe('removeAlerts', () => {
    let store;
    let state;

    beforeEach(() => {
      /** Reset store to initial state */
      store = createStore(combinedReducer, applyMiddleware(thunk));
      /** Load initial repositories to perform filtering tests */
      store.dispatch({ type: ADD_ALERT, payload: mockAlerts[0] });
      store.dispatch({ type: ADD_ALERT, payload: mockAlerts[1] });
      state = store.getState();
    });

    it('removes all alerts', () => {
      expect(state.alert.length).toBe(2);

      alertActionCreator.removeAlerts()(store.dispatch);

      state = store.getState();

      expect(state.alert.length).toBe(0);
    });
  });
} catch (err) {
  console.log(
    'Unexpected promise rejection occured while testing user action creators.'
  );
}
