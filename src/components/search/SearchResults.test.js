import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SearchResults from './SearchResults';

describe('searchResult snapshots', () => {
  const mockUsers = [
    {
      username: 'Test',
      id: 0,
      avatar: 'testImage',
    },
    {
      username: 'Test2',
      id: 1,
      avatar: 'testImage2',
    },
  ];

  it('multiple users renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <SearchResults users={mockUsers} />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('single user renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <SearchResults users={[mockUsers[0]]} />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('no users renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <SearchResults users={[]} />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
