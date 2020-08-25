/**
 * @fileoverview Defines a SearchResultItem react component that displays user information.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Image, Jumbotron } from 'react-bootstrap';

/**
 * SearchResultItem react component that displays user information in a react-bootstrap Col
 *    container.
 * @param {object} props Contains the user information to be displayed
 */
const SearchResultItem = ({ user }) => {
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

SearchResultItem.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    avatar_url: PropTypes.string,
  }).isRequired,
};

export default SearchResultItem;
