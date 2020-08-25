import React, { Fragment, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import repositoryActionCreator from '../../actionCreators/repository';
import userActionCreator from '../../actionCreators/user';
import alertActionCreator from '../../actionCreators/alert';
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import Repositories from './Repositories';

const User = ({
  user,
  repositories,
  loading,
  actions: {
    getRepositoriesForUser,
    filterRepositories,
    loadUser,
    removeAlerts,
  },
  match,
}) => {
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    removeAlerts();
    loadUser(match.params.username);
    getRepositoriesForUser(match.params.username);
  }, [removeAlerts, loadUser, getRepositoriesForUser, match.params.username]);

  const onChange = (e) => {
    setFilterInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    filterRepositories(filterInput);
  };

  return (
    <Fragment>
      {user ? (
        <Fragment>
          <h2 className="text-center green-text">
            Viewing repositories for {user.username}
          </h2>
          {user.num_repos > 0 ? (
            <Fragment>
              <h4 className=" text-center green-text">
                Click repository name to view details
              </h4>
              <br />
              <Container>
                <Row className="justify-content-md-center">
                  <Col lg="auto">
                    <h4 className="text-center green-text">
                      Filter repositories by name:
                    </h4>
                    <Form inline onSubmit={onSubmit}>
                      <FormControl
                        type="text"
                        className="mr-sm-2 ml-auto"
                        value={filterInput}
                        onChange={onChange}
                      />
                      <Button type="submit" variant="outline-success mr-auto">
                        Filter
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
              <br />
              {!loading ? (
                <Repositories repositories={repositories} />
              ) : (
                <h2 className="text-center">
                  <Spinner animation="border" variant="success" />
                </h2>
              )}
            </Fragment>
          ) : (
            <h4>User has no repositories</h4>
          )}
        </Fragment>
      ) : (
        <h2 className="text-center">
          <Spinner animation="border" variant="success" />
        </h2>
      )}
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    num_repos: PropTypes.number.isRequired,
  }),
  repositories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    getRepositoriesForUser: PropTypes.func.isRequired,
    filterRepositories: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  repositories: state.repository.displayed_repositories,
  loading: state.repository.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        ...repositoryActionCreator,
        ...userActionCreator,
        ...alertActionCreator,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
