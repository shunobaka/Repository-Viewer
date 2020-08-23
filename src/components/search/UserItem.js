import React from 'react';
import { Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserItem = ({ user }) => {
  return (
    <Col xm={4}>
      <h5>{user.login}</h5>
      <Image src={user.avatar_url} />
    </Col>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    avatar_url: PropTypes.string,
  }).isRequired,
};

export default UserItem;
