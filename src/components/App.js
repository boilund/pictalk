import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/';
import { Router } from './Router';

export const App = () => {
  return (
    <Provider>
      <Router store={store} />
    </Provider>
  );
};
