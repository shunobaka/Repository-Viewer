/**
 * @fileoverview Contains unit tests for the repository actionCreater.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import combinedReducer from '../reducers';
import githubApi from '../utils/githubApi';
import repositoryActionCreator from './repository';
import { REPOSITORIES_LOAD_FAIL } from '../utils/alertMessages';
import { REPOSITORIES_LOADED } from '../actions/types';

/** Mock githubApi so it does not make actual http requests */
jest.mock('../utils/githubApi.js');
/** Mock uuid used by alerts as crypto is underfined during testing */
jest.mock('../utils/uuid.js');

const mockResponse = {
  data: [
    {
      id: 0,
      name: 'Test repo',
      html_url: 'url',
    },
    {
      id: 0,
      name: 'Test repo 2',
      html_url: 'url',
    },
  ],
};

const expectedRepoState = [
  {
    id: mockResponse.data[0].id,
    name: mockResponse.data[0].name,
    url: mockResponse.data[0].html_url,
  },
  {
    id: mockResponse.data[1].id,
    name: mockResponse.data[1].name,
    url: mockResponse.data[1].html_url,
  },
];

/**
 * Wrap test code in try catch to remove UnhandledPromiseRejectionWarning which never occurs
 * due to mocked api
 */
try {
  describe('getRepositoriesForUser', () => {
    const loadedUser = 'shunobaka';
    let store;
    let state;

    beforeEach(() => {
      /** Reset store to initial state */
      store = createStore(combinedReducer, applyMiddleware(thunk));

      state = store.getState();
    });

    it('loads repositories correctly', async () => {
      githubApi.get.mockResolvedValueOnce(mockResponse);

      expect(state.repository.loading).toBe(true);
      expect(state.repository.repositories).toEqual([]);
      expect(state.repository.displayed_repositories).toEqual([]);

      await repositoryActionCreator.getRepositoriesForUser(loadedUser)(
        store.dispatch
      );

      state = store.getState();

      expect(githubApi.get).toBeCalledWith(`/users/${loadedUser}/repos`);
      expect(JSON.stringify(state.repository.repositories)).toEqual(
        JSON.stringify(expectedRepoState)
      );
      expect(JSON.stringify(state.repository.displayed_repositories)).toEqual(
        JSON.stringify(expectedRepoState)
      );
      expect(state.repository.loading).toBe(false);
    });

    it('sets alarm for invalid server response', async () => {
      githubApi.get.mockResolvedValueOnce({});

      expect(state.alert.length).toEqual(0);

      await repositoryActionCreator.getRepositoriesForUser(loadedUser)(
        store.dispatch
      );
      state = store.getState();

      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(REPOSITORIES_LOAD_FAIL);
      expect(state.repository.repositories).toEqual([]);
      expect(state.repository.displayed_repositories).toEqual([]);
      expect(githubApi.get).toBeCalledWith(`/users/${loadedUser}/repos`);
    });

    it('sets alarm for rejected promise', async () => {
      githubApi.get.mockRejectedValueOnce({});

      expect(state.alert.length).toEqual(0);

      await repositoryActionCreator.getRepositoriesForUser(loadedUser)(
        store.dispatch
      );
      state = store.getState();

      expect(state.alert.length).toBe(1);
      expect(state.alert[0].message).toEqual(REPOSITORIES_LOAD_FAIL);
      expect(state.repository.repositories).toEqual([]);
      expect(state.repository.displayed_repositories).toEqual([]);
      expect(githubApi.get).toBeCalledWith(`/users/${loadedUser}/repos`);
    });
  });

  describe('filterRepositories', () => {
    let store;
    let state;

    beforeEach(() => {
      /** Reset store to initial state */
      store = createStore(combinedReducer, applyMiddleware(thunk));
      /** Load initial repositories to perform filtering tests */
      store.dispatch({ type: REPOSITORIES_LOADED, payload: expectedRepoState });
      state = store.getState();
    });

    it('filters repositories correctly single result', () => {
      const filterQuery = mockResponse.data[1].name;

      const expectedFilteredRepoState = [
        ...expectedRepoState.filter((x) => x.name.includes(filterQuery)),
      ];

      repositoryActionCreator.filterRepositories(filterQuery)(store.dispatch);

      state = store.getState();

      expect(JSON.stringify(state.repository.displayed_repositories)).toEqual(
        JSON.stringify(expectedFilteredRepoState)
      );
    });

    it('filters repositories correctly multiple results', () => {
      const filterQuery = 'Test';

      const expectedFilteredRepoState = [
        ...expectedRepoState.filter((x) => x.name.includes(filterQuery)),
      ];

      repositoryActionCreator.filterRepositories(filterQuery)(store.dispatch);

      state = store.getState();

      expect(JSON.stringify(state.repository.displayed_repositories)).toEqual(
        JSON.stringify(expectedFilteredRepoState)
      );
    });

    it('filters repositories correctly no results', () => {
      const filterQuery = 'shunobaka';

      repositoryActionCreator.filterRepositories(filterQuery)(store.dispatch);

      state = store.getState();

      expect(JSON.stringify(state.repository.displayed_repositories)).toEqual(
        JSON.stringify([])
      );
    });
  });
} catch (err) {
  console.log(
    'Unexpected promise rejection occured while testing user action creators.'
  );
}
