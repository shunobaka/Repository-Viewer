/**
 * @fileoverview Defines a Repositories react component that renders a list of
 *    repositories.
 */
import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RepositoryItem from './RepositoryItem';

/**
 * Repositories react component that renders a list of repositories.
 * @param {object} props Contains the array of repositories to be displayed
 */
const Repositories = ({ repositories }) => {
  return (
    <Container>
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {repositories.length > 0 ? (
            <Accordion>
              {repositories.map((repo, index) => {
                return (
                  <RepositoryItem
                    key={repo.id}
                    index={index}
                    repository={repo}
                  />
                );
              })}
            </Accordion>
          ) : (
            <div className="alert alert-warning">
              No repositories match the filter!
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

Repositories.propTypes = {
  repositories: PropTypes.array.isRequired,
};

export default Repositories;
