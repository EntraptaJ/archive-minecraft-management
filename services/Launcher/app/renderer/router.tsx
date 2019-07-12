import React from 'react';
import { Router, createHistory, createMemorySource, LocationProvider } from '@reach/router';

import { RootApp } from './pages/Home';
import { StartApp } from './pages/start';
import { LoginPage } from './pages/Login';
import { SettingsPage } from './pages/Settings';

let source = createMemorySource('/');
export let history = createHistory(source);
export const navigate = history.navigate

export const AppRouter = () => {
  return (
    <LocationProvider history={history}>
      <Router component='main' className='app__content mdc-drawer-app-content'>
        <RootApp path='/' default />
        <StartApp path='/start' />
        <LoginPage path='/Login' />
        <SettingsPage path='/Settings' />
      </Router>
    </LocationProvider>
  );
};
