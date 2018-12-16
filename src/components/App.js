import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />

        {/* 404 */}
        <Route>
          <Fragment>
            <h1>This is not the page you are looking for</h1>
            <p>Use the force to find the right page, or type a correct URL</p>
          </Fragment>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
