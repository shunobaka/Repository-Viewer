import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import Search from './Search';
import store from '../../store';
import { usersLoaded } from '../../actions/user';
import userActionCreators from '../../actionCreators/user';

/** Mock functions to prevent creating http requests */
jest.mock('../../actionCreators/user.js');

userActionCreators.getUsers.mockImplementation(() => {
  return { type: 'mock_action' };
});

describe('search snapshots', () => {
  const query = 'shunobaka';

  const mockUsers = [
    {
      username: 'test1',
      id: 0,
      avatar: 'test1',
    },
    {
      username: query,
      id: 1,
      avatar: query,
      num_repos: 0,
    },
  ];

  const match = {
    params: {
      query,
    },
  };

  it('multiple users renders correctly', () => {
    act(() => {
      store.dispatch(usersLoaded(mockUsers, query));
    });

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Search match={match} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('single user renders correctly', () => {
    act(() => {
      store.dispatch(usersLoaded([mockUsers[0]], query));
    });

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Search match={match} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('no users renders correctly', () => {
    act(() => {
      store.dispatch(usersLoaded([], query));
    });

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Search match={match} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
