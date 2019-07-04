// UI/ui/Components/NavBar/index.tsx
import { useQuery } from '@apollo/react-hooks';
import '@material/drawer/dist/mdc.drawer.min.css';
import '@material/top-app-bar/dist/mdc.top-app-bar.min.css';
import '@rmwc/list/collapsible-list.css';
import { navigate } from '@reach/router';
import { Drawer, DrawerContent } from '@rmwc/drawer';
import { List, ListItem, ListProps } from '@rmwc/list';
import { TopAppBar, TopAppBarNavigationIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@rmwc/top-app-bar';
import React, { FunctionComponent, useEffect, useState } from 'react';
import NAVITEMSGQL from './NavItems.graphql';
import { handleNavItems } from './NavItem/handleItems';
import { NavItemType } from './types';

interface NavBarProps extends ListProps {}

type NavBarType = FunctionComponent<NavBarProps>;

export const NavBar: NavBarType = ({ ...props }) => {
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
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon icon='menu' onClick={() => setOpen(!open)} />
            <TopAppBarTitle onClick={() => navigate('/')}>Minecraft Management</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <Drawer open={open} dismissible={!isMobileState} modal={isMobileState} onClose={() => setOpen(false)}>
        <DrawerContent>
          <List {...props}>
            {loading ? <ListItem>Loading</ListItem> : data ? handleNavItems(data.getMenu) : <ListItem>Error</ListItem>}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};
