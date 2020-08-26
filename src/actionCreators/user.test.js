/**
 * @fileoverview Contains unit tests for the user actionCreater.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import combinedReducer from '../reducers';
import githubApi from '../utils/githubApi';
import userActionCreator from './user';
import { USERS_SEARCH_FAIL, USER_LOAD_FAIL } from '../utils/alertMessages';

/** Mock githubApi so it does not make actual http requests */
jest.mock('../utils/githubApi.js');
/** Mock uuid used by alerts as crypto is underfined during testing */
jest.mock('../utils/uuid.js');

/**
 * Wrap test code in try catch to remove UnhandledPromiseRejectionWarning which never occurs
 * due to mocked api
 */
try {
  describe('loadUser', () => {
    const searchedUser = 'shunobaka';
    let store;
    let state;

    beforeEach(() => {
      /** Reset store to initial state */
      store = createStore(combinedReducer, applyMiddleware(thunk));

      state = store.getState();
    });

    it('loads user correctly', async () => {
      const mockResponse = {
        data: {
          id: 0,
          login: searchedUser,
          avatar_url: 'url',
          public_repos: 10,
        },
      };

      const expectedUserState = {
        id: mockResponse.data.id,
        username: mockResponse.data.login,
        avatar: mockResponse.data.avatar_url,
        num_repos: mockResponse.data.public_repos,
      };

      githubApi.get.mockResolvedValueOnce(mockResponse);

      expect(state.user.user).toBeNull();

      await userActionCreator.loadUser(searchedUser)(store.dispatch);

      state = store.getState();

      expect(githubApi.get).toBeCalledWith(`/users/${searchedUser}`);
      expect(state.user.user).toEqual(expectedUserState);
    });

    it('sets alarm for invalid server response', async () => {
      githubApi.get.mockResolvedValueOnce({});

      expect(state.alert.length).toEqual(0);

      await userActionCreator.loadUser(searchedUser)(store.dispatch);
      state = store.getState();

      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(USER_LOAD_FAIL);
      expect(state.user.user).toBeNull();
      expect(githubApi.get).toBeCalledWith(`/users/${searchedUser}`);
    });

    it('sets alarm for rejected promise', async () => {
      githubApi.get.mockRejectedValueOnce({});

      expect(state.alert.length).toEqual(0);

      await userActionCreator.loadUser(searchedUser)(store.dispatch);
      state = store.getState();

      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(USER_LOAD_FAIL);
      expect(state.user.user).toBeNull();
      expect(githubApi.get).toBeCalledWith(`/users/${searchedUser}`);
    });
  });

  describe('getUsers', () => {
    const searchQuery = 'shunobaka';
    let store;
    let state;

    beforeEach(() => {
      /** Reset store to initial state */
      store = createStore(combinedReducer, applyMiddleware(thunk));

      state = store.getState();
    });

    it('loads users correctly', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              id: 0,
              login: searchQuery,
              avatar_url: 'url',
              public_repos: 10,
            },
          ],
        },
      };

      const expectedUsersState = [
        {
          username: mockResponse.data.items[0].login,
          avatar: mockResponse.data.items[0].avatar_url,
          id: mockResponse.data.items[0].id,
          num_repos: mockResponse.data.items[0].public_repos,
        },
      ];

      githubApi.get.mockResolvedValueOnce(mockResponse);

      await userActionCreator.getUsers(searchQuery)(store.dispatch);

      state = store.getState();

      expect(githubApi.get).toBeCalledWith(`/search/users?q=${searchQuery}`);
      expect(JSON.stringify(state.user.users)).toEqual(
        JSON.stringify(expectedUsersState)
      );
    });

    it('sets alarm for invalid server response', async () => {
      githubApi.get.mockResolvedValueOnce({});

      expect(state.alert.length).toEqual(0);

      await userActionCreator.getUsers(searchQuery)(store.dispatch);
      state = store.getState();

      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(USERS_SEARCH_FAIL);
      expect(state.user.users.length).toBe(0);
      expect(githubApi.get).toBeCalledWith(`/users/${searchQuery}`);
    });

    it('sets alarm for rejected promise', async () => {
      githubApi.get.mockRejectedValueOnce({});

      expect(state.alert.length).toEqual(0);

      await userActionCreator.getUsers(searchQuery)(store.dispatch);
      state = store.getState();

      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(USERS_SEARCH_FAIL);
      expect(state.user.users.length).toBe(0);
      expect(githubApi.get).toBeCalledWith(`/users/${searchQuery}`);
    });
  });
} catch (err) {
  console.log(
    'Unexpected promise rejection occured while testing user action creators.'
  );
}
