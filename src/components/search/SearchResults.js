import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SearchResultItem from './SearchResultItem';
import PropTypes from 'prop-types';

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
