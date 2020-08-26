import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from './NotFound';

describe('notFound snapshots', () => {
  it('notFound page renders correctly', () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
