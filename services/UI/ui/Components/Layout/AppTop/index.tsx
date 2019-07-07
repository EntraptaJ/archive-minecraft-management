// UI/ui/Components/Layout/AppTop/index.tsx
import { useQuery } from '@apollo/react-hooks';
import '@material/drawer/dist/mdc.drawer.min.css';
import '@material/top-app-bar/dist/mdc.top-app-bar.min.css';
import { navigate } from '@reach/router';
import { Drawer, DrawerContent } from '@rmwc/drawer';
import { List, ListItem, ListProps } from '@rmwc/list';
import {
  TopAppBar,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
} from '@rmwc/top-app-bar';
import React, { FunctionComponent, useEffect, useState } from 'react';
import NAVITEMSGQL from './NavItems.graphql';
import { handleNavItems } from './NavItem/handleItems';
import { NavItemType } from './types';

interface AppTopProps extends ListProps {}

type AppTopType = FunctionComponent<AppTopProps>;

export const AppTop: AppTopType = ({ children, ...props }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState(true);
  const { data, loading } = useQuery<{ getMenu: NavItemType[] }>(NAVITEMSGQL);

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
      <TopAppBar fixed className='app__top-app-bar'>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon icon='menu' onClick={() => setOpen(!open)} />
            <TopAppBarTitle onClick={() => navigate('/')}>Minecraft</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <div className='demo-content'>
        <Drawer id='main-nav' open={open} dismissible={!isMobileState} modal={isMobileState} onClose={() => setOpen(false)}>
          <DrawerContent>
            <List {...props}>
              {loading ? <ListItem>Loading</ListItem> : data ? handleNavItems(data.getMenu) : <ListItem>Error</ListItem>}
            </List>
          </DrawerContent>
        </Drawer>
        {children}
      </div>
    </>
  );
};
