import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignUp from './SignUp';
import Login from './Login';
import Album from './Album';

export const App = () => {
  return (
    <Fragment>
      <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/album" component={Album} />

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
