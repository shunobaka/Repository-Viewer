/**
 * @fileoverview Defines a User react component that uses the user and
 *    repository redux states to display a page with filtering option and
 *    list of user repositories.
 */
import React, { Fragment, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';

import repositoryActionCreator from '../../actionCreators/repository';
import userActionCreator from '../../actionCreators/user';
import alertActionCreator from '../../actionCreators/alert';
import Repositories from '../../components/user/Repositories';

/**
 * User react component that displays a page with filtering option and list of
 *    user repositories. Gets dynamically updated when user redux state changes.
 * @param {object} props Contains mapped user redux state, action creator functions
 *    and match object
 */
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
            <Container className="text-center">
              <br />
              <div className="alert alert-warning">
                User has no repositories!
              </div>
            </Container>
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
  /** The redux state user whose repositories are being displayed */
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    num_repos: PropTypes.number.isRequired,
  }),
  /** The redux state repositories to be displayed */
  repositories: PropTypes.array.isRequired,
  /** Redux state boolean that signals loading of data */
  loading: PropTypes.bool.isRequired,
  /** Actions used to retrieve and filter repositories, load user and remove alerts */
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

/**
 * Maps the user and repository redux states to the props consumed by the
 *    react component.
 * @param {object} state The complete redux state object
 */
const mapStateToProps = (state) => ({
  user: state.user.user,
  repositories: state.repository.displayed_repositories,
  loading: state.repository.loading,
});

/**
 * Binds the dispatch function to the action creators and maps them to the
 *    props consumed by the react component
 * @param {Function} dispatch The dispatch function
 */
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
