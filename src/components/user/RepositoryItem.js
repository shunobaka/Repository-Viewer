import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RepositoryItem = ({ repository, index }) => {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={repository.id}>
        {index + 1}. {repository.name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={repository.id}>
        <Card.Body>Hello! I'm the body</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

export default RepositoryItem;
