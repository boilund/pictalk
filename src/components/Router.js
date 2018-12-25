import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignUp from '../containers/SignUp';
import Login from '../containers/Login';
import Album from '../containers/Album';
import CommentPage from './CommentPage';
import PostPage from './PostPage';
import FavoritePage from './FavoritePage';
import MyphotoPage from './MyphotoPage';
import Settings from '../containers/Settings';

export const Router = () => {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path={'/album'} component={Album} />
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
              <p>Use the force to find the right page, or type a correct URL</p>
            </Fragment>
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};
