import React from 'react';
import renderer from 'react-test-renderer';
import Landing from './Landing';

describe('landing snapshots', () => {
  it('landing page renders correctly', () => {
    const tree = renderer.create(<Landing />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
