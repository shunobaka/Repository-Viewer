/**
 * @fileoverview Defines unit test for user actions.
 */
import { userLoaded, usersLoaded } from './user';
import { USER_LOADED, USERS_SEARCH_RESULT } from './types';

const mockUsers = [
  {
    username: 'Test',
    id: 0,
  },
  {
    username: 'Test 2',
    id: 1,
  },
];

describe('userLoaded', () => {
  it('sets correct type', () => {
    const action = userLoaded(mockUsers[0]);

    expect(action.type).toEqual(USER_LOADED);
  });

  it('sets correct payload', () => {
    const action = userLoaded(mockUsers[0]);

    expect(action.payload).toBe(mockUsers[0]);
  });
});

describe('usersLoaded', () => {
  const query = 'query';

  it('sets correct type', () => {
    const action = usersLoaded(mockUsers, query);

    expect(action.type).toEqual(USERS_SEARCH_RESULT);
  });

  it('sets correct payload', () => {
    const action = usersLoaded(mockUsers, query);

    expect(action.payload.users).toBe(mockUsers);
    expect(action.payload.query).toBe(query);
  });
});
