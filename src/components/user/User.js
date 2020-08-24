import React, { Fragment, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import repositoryActionCreator from '../../actionCreators/repository';
import userActionCreator from '../../actionCreators/user';
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import Repositories from './Repositories';

const User = ({
  user,
  repositories,
  actions: { getRepositoriesForUser, filterRepositories, loadUser },
  match,
}) => {
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    loadUser(match.params.username);
    getRepositoriesForUser(match.params.username);
  }, [loadUser, getRepositoriesForUser, match.params.username]);

  const onChange = (e) => {
    setFilterInput(e.target.value);
  };

  return (
    <Fragment>
      {user ? (
        <Fragment>
          <h2 className="text-center green-text">
            Viewing repositories for {user.username}
          </h2>
          {repositories.length > 0 ? (
            <Fragment>
              <h4 className=" text-center green-text">
                Click repository name to view additional info
              </h4>
              <br />
              <Container>
                <Row className="justify-content-md-center">
                  <Col sm="auto">
                    <h4 className="text-center green-text">
                      Search repositories:
                    </h4>
                    <Form
                      inline
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <FormControl
                        type="text"
                        className="mr-sm-2 ml-auto"
                        value={filterInput}
                        onChange={onChange}
                      />
                      <Button variant="outline-success mr-auto">Filter</Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
              <br />
              <Repositories repositories={repositories} />
            </Fragment>
          ) : (
            <h4>User has no repositories</h4>
          )}
        </Fragment>
      ) : (
        <h2>User loading</h2>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  repositories: state.repository.displayed_repositories,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      { ...repositoryActionCreator, ...userActionCreator },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
