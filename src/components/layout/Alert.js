/**
 * @fileoverview Defines an Alert react component that uses the alert redux state
 *    to display alerts.
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

/**
 * Alert react component that displays provided alerts. Gets dynamically updated when
 *    the alert redux state changes.
 * @param {object} props Contains the mapped alerts from the alert redux state
 */
const Alert = ({ alerts }) => {
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

export default connect(mapStateToProps)(Alert);
