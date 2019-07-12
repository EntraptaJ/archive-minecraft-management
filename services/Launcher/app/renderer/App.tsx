// Launcher/app/renderer/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { AppRouter } from './router';
import { AppBar } from './components/AppBar';
import { Nav } from './components/Layout/NavBar';

import '@material/drawer/dist/mdc.drawer.min.css';

export const App: React.FunctionComponent = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState(true);
  const doSizeCheck = (initial?: boolean) => {
    const isMobile = window.innerWidth < 640;

    if (isMobileState !== isMobile) {
      setIsMobileState(isMobile);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => doSizeCheck());

    doSizeCheck(false);
  }, []);

  return (
    <>
      <AppBar onNavClick={() => setMenuOpen(!menuOpen)} appName='Minecraft Launcher' />
      <Nav
        navItems={[{ label: 'Home', path: '/' }, { label: 'Settings', path: '/Settings' }]}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        dismissible={!isMobileState}
        modal={isMobileState}
      />
      <AppRouter />
    </>
  );
};
