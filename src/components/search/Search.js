import React, { Fragment } from 'react';
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

export default Search;
