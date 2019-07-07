import React, { useState, useEffect } from 'react';
import { Routes } from './routes/index';
import './App.css';
import { AppBar } from '~Components/Layout/AppBar';
import { Nav, NavItemType } from '~Components/Layout/Nav';
import GETNAVGQL from './Components/Layout/getNav.graphql';
import { useQuery } from '@apollo/react-hooks';

export const App: React.FunctionComponent = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState(true);
  const { data } = useQuery<{ getNav: NavItemType[] }>(GETNAVGQL);
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
      <AppBar onNavClick={() => setMenuOpen(!menuOpen)} appName='Minecraft' />
      <Nav
        navItems={data ? data.getNav : [{ label: 'Home', path: '/' }]}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        dismissible={!isMobileState}
        modal={isMobileState}
      />
      <Routes />
    </>
  );
};
