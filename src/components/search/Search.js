import React, { Fragment, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import userActionCreator from '../../actionCreators/user';
import Users from './Users';

const Search = ({ user: { users, query }, actions: { getUsers }, match }) => {
  useEffect(() => {
    getUsers(match.params.query);
  }, [getUsers, match.params.query]);

  return (
    <Fragment>
      <h2 className="text-center green-text">Search results for {query}:</h2>
      {users && users.length > 0 ? (
        <Users users={users} />
      ) : (
        <h2 className="text-center green-text">
          No users found with this username. Please try again.
        </h2>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(userActionCreator, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
