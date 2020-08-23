import React, { Fragment } from 'react';
import UserItem from './UserItem';
import PropTypes from 'prop-types';

const Users = ({ users }) => {
  return (
    <Fragment>
      {users.map((user) => {
        return <UserItem user></UserItem>;
      })}
    </Fragment>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Users;
