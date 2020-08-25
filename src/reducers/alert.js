/**
 * @fileoverview Defines a reducer used to process redux actions related to alert state.
 */
import { ADD_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../actions/types';

/**
 * The initial alert redux state.
 */
const initialState = [];

/**
 * Returns a new alert state based on current state and provided action.
 * @param {array} state The redux alert state
 * @param {object} action Redux action object
 * @return {array} Updated state array of alert objects
 * @export
 */
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    case CLEAR_ALERTS:
      return [];
    default:
      return state;
  }
}
