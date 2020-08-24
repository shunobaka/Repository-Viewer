import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserItem = ({ user }) => {
  return (
    <Col md={3}>
      <Jumbotron>
        <Link to={`/user/${user.username}`}>
          <h4 className="text-center">{user.username}</h4>
          <Image width="100%" src={user.avatar} />
        </Link>
      </Jumbotron>
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
