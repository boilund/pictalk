import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/';
import { Router } from '../containers/Router';

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
