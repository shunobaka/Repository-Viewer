/**
 * @fileoverview Defines snapshot unit tests for Routes component.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderer, { act } from 'react-test-renderer';
import Routes from './Routes';
import store from '../../store';
import { usersLoaded, userLoaded } from '../../actions/user';
import userActionCreators from '../../actionCreators/user';
import repositoryActionCreators from '../../actionCreators/repository';

/** Mock functions to prevent creating http requests */
jest.mock('../../actionCreators/repository.js');
jest.mock('../../actionCreators/user.js');

/** Mock the actionCreators used by the component to do nothing */
userActionCreators.loadUser.mockImplementation(() => {
  return { type: 'mock_action' };
});

userActionCreators.getUsers.mockImplementation(() => {
  return { type: 'mock_action' };
});

repositoryActionCreators.getRepositoriesForUser.mockImplementation(() => {
  return { type: 'mock_action' };
});

describe('routes snapshots', () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    history = null;
  });

  it('home route renders correctly', () => {
    history.push('/');

    const tree = renderer
      .create(
        <Router history={history}>
          <Routes />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('search route renders correctly', () => {
    history.push('/search/test');

    act(() => {
      store.dispatch(usersLoaded([], ''));
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Routes />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('user route renders correctly', () => {
    history.push('/user/test');

    const mockUser = {
      username: 'Test',
      num_repos: 0,
    };

    act(() => {
      store.dispatch(userLoaded(mockUser));
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Routes />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('unknown route renders correctly', () => {
    history.push('/not-exist');

    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Routes />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
