/**
 * @fileoverview Defines snapshot unit tests for RepositoryItem component.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import RepositoryItem from './RepositoryItem';

describe('repositoryItem snapshots', () => {
  const mockRepo = {
    name: 'Test',
    id: 0,
  };

  it('repository renders correctly', () => {
    const index = 0;

    const tree = renderer
      .create(
        <BrowserRouter>
          <RepositoryItem repository={mockRepo} index={index} />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
