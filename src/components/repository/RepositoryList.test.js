/**
 * @fileoverview Defines snapshot unit tests for Repositories component.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import RepositoryList from './RepositoryList';

describe('repositoryList snapshots', () => {
  const mockRepos = [
    {
      name: 'Test',
      id: 0,
      description: 'Description',
    },
    {
      name: 'Test2',
      id: 1,
    },
  ];

  it('mutliple repositories renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <RepositoryList repositories={mockRepos} />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('single repository renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <RepositoryList repositories={[mockRepos[0]]} />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('no repositories renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <RepositoryList repositories={[]} />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
