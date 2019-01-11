import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggined, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggined ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLoggined: PropTypes.bool.isRequired,
  rest: PropTypes.arrayOf(PropTypes.object)
};

export default PrivateRoute;
