import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignUp from './SignUp';
import Login from './Login';
import Album from './Album';
import NotificationsPage from './NotificationsPage';
import PostPage from './PostPage';
import FavoritePage from './FavoritePage';
import MyphotoPage from './MyphotoPage';
import Settings from './Settings';
import PrivateRoute from '../components/PrivateRoute';

const AppRouter = props => {
  const { isLoggined } = props;

  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <PrivateRoute
            exact
            path={'/'}
            isLoggined={isLoggined}
            component={Album}
          />
          <PrivateRoute
            path={'/notifications'}
            isLoggined={isLoggined}
            component={NotificationsPage}
          />
          <PrivateRoute
            path={'/post'}
            isLoggined={isLoggined}
            component={PostPage}
          />
          <PrivateRoute
            path={'/favorite'}
            isLoggined={isLoggined}
            component={FavoritePage}
          />
          <PrivateRoute
            path={'/myphoto'}
            isLoggined={isLoggined}
            component={MyphotoPage}
          />
          <PrivateRoute
            path={'/settings'}
            isLoggined={isLoggined}
            component={Settings}
          />

          {/* 404 */}
          <Route>
            <Fragment>
              <h1>This is not the page you are looking for</h1>
              <p>Use the force to find the right page, or type a correct URL</p>
            </Fragment>
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

AppRouter.propTypes = {
  isLoggined: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggined: state.user.loggedIn
  };
};

export default connect(
  mapStateToProps,
  null
)(AppRouter);
