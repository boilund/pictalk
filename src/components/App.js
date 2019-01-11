import React from 'react';
import configureStore from '../store/';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from '../containers/AppRouter';
import Loading from './Loading';

const { store, persistor } = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};
