/**
 * @fileoverview Defines snapshot unit tests for Navigation component.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Navigation from './Navigation';

describe('navigation snapshots', () => {
  it('navigation renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
