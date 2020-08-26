/**
 * @fileoverview Defines an Alert react component that uses the alert redux state
 *    to display alerts.
 */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import alertActionCreator from '../../actionCreators/alert';

/**
 * Alert react component that displays provided alerts. Gets dynamically updated when
 *    the alert redux state changes.
 * @param {object} props Contains the mapped alerts from the alert redux state
 */
const Alert = ({ alerts, actions: { removeAlerts } }) => {
  const history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      removeAlerts();
    });
  }, [removeAlerts, history]);

  return (
    <Fragment>
      {alerts.length > 0 && (
        <div className="alert-container text-center">
          <Container>
            {alerts.map((alert, index) => {
              return (
                <div className="alert alert-danger" key={alert.id} role="alert">
                  {alert.message}
                </div>
              );
            })}
          </Container>
        </div>
      )}
    </Fragment>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

/**
 * Maps the alert redux state to the props consumed by the react component.
 * @param {object} state The complete redux state object
 */
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...alertActionCreator }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
