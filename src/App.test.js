/**
 * @fileoverview Defines snapshot unit tests for App component.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
