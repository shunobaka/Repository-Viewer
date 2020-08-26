import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SearchResultItem from './SearchResultItem';

describe('searchResultItem snapshots', () => {
  const mockUser = {
    username: 'Test',
  };

  it('mock user renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <SearchResultItem user={mockUser} />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
