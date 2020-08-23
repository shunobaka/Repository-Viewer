import React, { Fragment } from 'react';
import UserItem from './UserItem';
import PropTypes from 'prop-types';

const Users = ({ users, query }) => {
  return (
    <Fragment>
      <h2 className="text-center">Search results for {query}:</h2>
      {users && users.count > 0 ? (
        users.map((user) => {
          return <UserItem user></UserItem>;
        })
      ) : (
        <h2 className="text-center">
          No users found with this username. Please try again.
        </h2>
      )}
    </Fragment>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
};

export default Users;
