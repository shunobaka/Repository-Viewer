import React, { Fragment, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userActionCreator from '../../actionCreators/user';
import SearchResults from './SearchResults';

const Search = ({ user: { users, query }, actions: { getUsers }, match }) => {
  useEffect(() => {
    getUsers(match.params.query);
  }, [getUsers, match.params.query]);

  return (
    <Fragment>
      <h2 className="text-center green-text">Search results for {query}:</h2>
      {users && users.length > 0 ? (
        <SearchResults users={users} />
      ) : (
        <h2 className="text-center green-text">
          No users found with this username. Please try again.
        </h2>
      )}
    </Fragment>
  );
};

Search.propTypes = {
  user: PropTypes.shape({
    users: PropTypes.array.isRequired,
    query: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({
    getUsers: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(userActionCreator, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
