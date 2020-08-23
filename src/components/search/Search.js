import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import userActionCreator from '../../actionCreators/user';
import Users from './Users';

const Search = ({ match }) => {
  // TODO: Implement users fetching
  const users = [];

  return (
    <Fragment>
      <h2 className="text-center green-text">
        Search results for {match.params.query}:
      </h2>
      {users && users.count > 0 ? (
        <Users users />
      ) : (
        <h2 className="text-center green-text">
          No users found with this username. Please try again.
        </h2>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(userActionCreator, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
