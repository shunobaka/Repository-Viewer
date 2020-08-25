import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

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

const matchStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(matchStateToProps)(Alert);
