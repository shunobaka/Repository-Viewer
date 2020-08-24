import React, { Fragment, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import repositoryActionCreator from '../../actionCreators/repository';

const User = ({
  user,
  repositories,
  actions: { getRepositoriesForUser, filterRepositories },
  match,
}) => {
  useEffect(() => {
    getRepositoriesForUser(match.params.username);
  }, [getRepositoriesForUser, match.params.username]);

  return <Fragment></Fragment>;
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  repositories: state.repository.displayed_repositories,
});

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(repositoryActionCreator, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
