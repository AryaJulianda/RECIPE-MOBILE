/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './src/router';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storages from './src/storages/store';
import React from 'react';

const {store, persistor} = storages();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
