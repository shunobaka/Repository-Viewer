import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import User from './User';
import store from '../../store';
import { userLoaded } from '../../actions/user';
import { repositoriesLoaded } from '../../actions/repository';
import userActionCreators from '../../actionCreators/user';
import repositoryActionCreators from '../../actionCreators/repository';

/** Mock functions to prevent creating http requests */
jest.mock('../../actionCreators/repository.js');
jest.mock('../../actionCreators/user.js');

userActionCreators.loadUser.mockImplementation(() => {
  return { type: 'mock_action' };
});

repositoryActionCreators.getRepositoriesForUser.mockImplementation(() => {
  return { type: 'mock_action' };
});

describe('user snapshots', () => {
  const username = 'shunobaka';
  const mockRepos = [
    {
      id: 0,
      name: 'Test 1',
      url: 'TestUrl1',
      description: 'Description 1',
    },
    {
      id: 1,
      name: 'Test 2',
      url: 'TestUrl2',
    },
  ];
  const mockUserRepos = {
    username: username,
    id: 1,
    avatar: username,
    num_repos: 1,
  };
  const mockUserNoRepos = {
    username: username,
    id: 1,
    avatar: username,
    num_repos: 0,
  };
  const match = {
    params: {
      username,
    },
  };

  it('no user renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <User match={match} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('no repository user renders correctly', () => {
    act(() => {
      store.dispatch(userLoaded(mockUserNoRepos));
    });

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <User match={match} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('single repository user renders correctly', () => {
    act(() => {
      store.dispatch(userLoaded(mockUserRepos));
      store.dispatch(repositoriesLoaded([mockRepos[0]]));
    });

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <User match={match} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('multiple repositories user renders correctly', () => {
    act(() => {
      store.dispatch(userLoaded(mockUserRepos));
      store.dispatch(repositoriesLoaded(mockRepos));
    });

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <User match={match} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
