/**
 * @fileoverview Defines a Search react component that uses the user redux state
 *    to display a page with list of github users matching username query.
 */
import React, { Fragment, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userActionCreator from '../../actionCreators/user';
import alertActionCreator from '../../actionCreators/alert';
import SearchResults from './SearchResults';
import { Spinner, Container } from 'react-bootstrap';

/**
 * Search react component that displays a page with list of github users matching
 *    username query. Gets dynamically updated when user redux state changes.
 * @param {object} props Contains mapped user redux state, action creator functions
 *    and match object
 */
const Search = ({
  user: { users, query, loading },
  actions: { getUsers, removeAlerts },
  match,
}) => {
  useEffect(() => {
    removeAlerts();
    getUsers(match.params.query);
  }, [removeAlerts, getUsers, match.params.query]);

  return (
    <Fragment>
      {loading ? (
        <h2 className="text-center">
          <Spinner animation="border" variant="success" />
        </h2>
      ) : (
        <Fragment>
          <h2 className="text-center green-text">
            Search results for {query}:
          </h2>
          {users && users.length > 0 ? (
            <SearchResults users={users} />
          ) : (
            <Container className="text-center">
              <br />
              <div className="alert alert-warning">
                No users found matching {query}!
              </div>
            </Container>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Search.propTypes = {
  /** The user redux state */
  user: PropTypes.shape({
    users: PropTypes.array.isRequired,
    query: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  /** Actions used to retrieve users and remove alerts */
  actions: PropTypes.shape({
    getUsers: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * Maps the user redux state to the props consumed by the react component.
 * @param {object} state The complete redux state object
 */
const mapStateToProps = (state) => ({
  user: state.user,
});

/**
 * Binds the dispatch function to the action creators and maps them to the
 *    props consumed by the react component
 * @param {Function} dispatch The dispatch function
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      { ...alertActionCreator, ...userActionCreator },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
