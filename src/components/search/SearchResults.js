/**
 * @fileoverview Defines a SearchResults react component that displays a list of
 *    github users.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';

import SearchResultItem from './SearchResultItem';

/**
 * SearchResults react component that displays a list of github users.
 * @param {object} props Contains an array of user information to be displayed
 */
const SearchResults = ({ users }) => {
  return (
    <Container>
      <Row>
        {users.map((user) => {
          return (
            <SearchResultItem key={user.id} user={user}></SearchResultItem>
          );
        })}
      </Row>
    </Container>
  );
};

SearchResults.propTypes = {
  users: PropTypes.array.isRequired,
};

export default SearchResults;
