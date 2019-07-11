// Launcher/app/renderer/App.tsx
import React from 'react'
import './App.css'
import { AppRouter } from './router';
import { AppBar } from './components/AppBar';

export const App: React.FunctionComponent = () => {
  return (
    <>
      <AppBar appName='Minecraft Launcher' />
      <AppRouter />

    </>
  )
}