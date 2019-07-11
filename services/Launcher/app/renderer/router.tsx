import React from 'react'
import { Router } from '@reach/router'

import { RootApp } from './pages/root'
import { StartApp } from './pages/start'
import { LoginPage } from './pages/Login'

export const AppRouter = () => {
  return (
    <Router component='main' className='app__content mdc-drawer-app-content'>
      <RootApp path='/' default />
      <StartApp path='/start' />
      <LoginPage path='/Login' />
    </Router>

  )
}