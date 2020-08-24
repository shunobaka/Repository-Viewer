import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RepositoryItem from './RepositoryItem';

const Repositories = ({ repositories }) => {
  return (
    <Container>
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Accordion>
            {repositories.map((repo, index) => {
              return (
                <RepositoryItem key={repo.id} index={index} repository={repo} />
              );
            })}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

Repositories.propTypes = {
  repositories: PropTypes.array.isRequired,
};

export default Repositories;
