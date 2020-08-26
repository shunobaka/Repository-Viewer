/**
 * @fileoverview Defines unit tests for user reducer.
 */
import userReducer from './user';
import { USERS_SEARCH_RESULT, USER_LOADED } from '../actions/types';

const mockUsers = [
  {
    username: 'Test',
    id: 0,
  },
  {
    username: 'Test2',
    id: 1,
  },
];

describe('USER_LOADED type', () => {
  const type = USER_LOADED;
  const payload = mockUsers[0];
  const initialState = {
    user: null,
    users: mockUsers,
    loading: true,
    query: 'Query',
  };

  it('loads user', () => {
    const newState = userReducer(initialState, { type, payload });

    expect(JSON.stringify(newState.user)).toEqual(JSON.stringify(payload));
  });

  it('overwrites user', () => {
    const newState = userReducer(
      { ...initialState, user: mockUsers[1] },
      { type, payload }
    );

    expect(newState.user).toBe(payload);
    expect(newState.user).not.toBe(mockUsers[1]);
  });

  it('does not modify other props', () => {
    const initialStateQuey = initialState.query;
    const initialStateLoading = initialState.loading;
    const initialStateUsers = [...initialState.users];
    const newState = userReducer(initialState, { type, payload });

    expect(newState.loading).toBe(initialStateLoading);
    expect(newState.query).toEqual(initialStateQuey);
    expect(JSON.stringify(newState.users)).toBe(
      JSON.stringify(initialStateUsers)
    );
  });

  it('returns new object', () => {
    const newState = userReducer(initialState, { type, payload });

    expect(newState).not.toBe(initialState);
  });
});

describe('USERS_SEARCH_RESULT type', () => {
  const type = USERS_SEARCH_RESULT;
  const payload = {
    query: 'Test',
    users: mockUsers,
  };
  const initialState = {
    user: null,
    users: [],
    loading: true,
    query: '',
  };

  it('loads users', () => {
    const newState = userReducer(initialState, {
      type,
      payload: payload,
    });

    expect(newState.users.length).toBe(mockUsers.length);

    for (let index in mockUsers) {
      expect(newState.users).toContain(mockUsers[index]);
    }
  });

  it('updates loading to false', () => {
    const newState = userReducer(initialState, {
      type,
      payload: payload,
    });

    expect(initialState.loading).toBe(true);
    expect(newState.loading).toBe(false);
  });

  it('updates query', () => {
    const newState = userReducer(initialState, {
      type,
      payload: payload,
    });

    expect(initialState.query).not.toEqual(payload.query);
    expect(newState.query).toEqual(payload.query);
  });

  it('sets user to null', () => {
    const newState = userReducer(initialState, {
      type,
      payload: payload,
    });

    expect(newState.user).toBeNull();
  });

  it('returns new object', () => {
    const newState = userReducer(initialState, {
      type,
      payload: payload,
    });

    expect(newState).not.toBe(initialState);
  });
});

describe('default case', () => {
  const initialState = {
    user: mockUsers[0],
    users: mockUsers,
    loading: true,
    query: 'Query',
  };

  it('default case returns same state', () => {
    const initialStateCopy = { ...initialState };
    const newState = userReducer(initialState, {
      type: 'INVALID_TYPE',
    });

    /** Ensure the state does not change */
    expect(newState).not.toBe(initialStateCopy);
    expect(JSON.stringify(newState)).toEqual(JSON.stringify(initialStateCopy));
    /** Ensure the returned object is the initial one */
    expect(newState).toBe(initialState);
  });
});
