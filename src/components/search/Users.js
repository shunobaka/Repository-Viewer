import React from 'react';
import { Container, Row } from 'react-bootstrap';
import UserItem from './UserItem';
import PropTypes from 'prop-types';

const Users = ({ users }) => {
  return (
    <Container>
      <Row>
        {users.map((user) => {
          return <UserItem key={user.id} user={user}></UserItem>;
        })}
      </Row>
    </Container>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Users;
