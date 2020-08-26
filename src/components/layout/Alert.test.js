/**
 * @fileoverview Defines snapshot unit tests for Alert component.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';

import Alert from './Alert';
import store from '../../store';
import { addAlert } from '../../actions/alert';

describe('alert snapshots', () => {
  const mockAlert = {
    message: 'Test',
    id: 0,
  };

  it('no alerts renders correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Alert />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('single alert renders correctly', () => {
    act(() => {
      store.dispatch(addAlert(mockAlert));
    });

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Alert />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
