import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignUp from './SignUp';
import Login from './Login';
import Album from './Album';
import CommentPage from '../components/CommentPage';
import PostPage from '../components/PostPage';
import FavoritePage from '../components/FavoritePage';
import MyphotoPage from '../components/MyphotoPage';
import Settings from './Settings';
import axios from 'axios';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class Router extends React.Component {
  componentDidUpdate(prevProps) {
    // console.log('Props', this.props);
    // if (this.props.setUser !== prevProps.setUser) {
    //   console.log(this.props);
    //   this.props.setUser();
    // }
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route exact path={'/'} component={Album} />
            <Route path={'/comment'} component={CommentPage} />
            <Route path={'/post'} component={PostPage} />
            <Route path={'/favorite'} component={FavoritePage} />
            <Route path={'/myphoto'} component={MyphotoPage} />
            <Route path={'/favorite'} component={FavoritePage} />
            <Route path={'/settings'} component={Settings} />

            {/* 404 */}
            <Route>
              <Fragment>
                <h1>This is not the page you are looking for</h1>
                <p>
                  Use the force to find the right page, or type a correct URL
                </p>
              </Fragment>
            </Route>
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

Router.propTypes = {
  setUser: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(actions.setUser(user))
  };
};

const connected = connect(
  null,
  mapDispatchToProps
)(Router);

export default withRouter(connected);
