import React, { useContext, useState, useMemo } from 'react';
import 'ui/App.css';
import Loadable from 'react-loadable';
import { Routes } from 'ui/routes/index';
import { PropContext } from 'ui/Components/PropProvider';
import { routes } from 'ui/Components/Routes';
import { LoadingProgress } from '~Components/Loading';
import { NavItemType } from 'ui/Components/Layout/Nav';
import { useQuery } from '@apollo/react-hooks';
import GETNAVGQL from 'ui/Components/Layout/Nav/getNav.graphql';

const AppBar = Loadable({
  loader: () => import('ui/Components/Layout/AppBar'),
  modules: ['Components/Layout/AppBar/index.tsx'],
  loading: LoadingProgress,
});

const Nav = Loadable({
  loader: () => import('ui/Components/Layout/Nav'),
  modules: ['Components/Layout/Nav/index.tsx'],
  loading: LoadingProgress,
});

const App: React.FunctionComponent = () => {
  const { ctx } = useContext(PropContext);
  const { data } = useQuery<{ getNav: NavItemType[] }>(GETNAVGQL);
  const [usrPath] = useState(typeof ctx !== 'undefined' ? ctx.request.url : window.location.pathname);
  const route = useMemo(() => routes.find(({ to }) => usrPath === to), [usrPath]);

  return (
    <>
      {!route || !route.hideUI ? <AppBar appName='Minecraft' /> : <></>}
      <div className='main-content' style={{ display: 'flex', flex: '1 1', position: 'relative' }}>
        {!route || !route.hideUI ? <Nav items={data && data.getNav ? data.getNav : []} /> : <></>}
        <Routes />
      </div>
    </>
  );
};

export default App;
