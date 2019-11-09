// UI/ui/Components/Layout/Nav/index.tsx
import { useQuery } from '@apollo/react-hooks';
import { UniversalPortal } from '@jesstelford/react-portal-universal';
import { Drawer, DrawerContent } from '@rmwc/drawer';
import { CollapsibleList, List, SimpleListItem, ListItem } from '@rmwc/list';
import { TopAppBarNavigationIcon } from '@rmwc/top-app-bar';
import React, { FunctionComponent, useState } from 'react';

import './Nav.css';
import { routes, NavItem as NavItem } from 'ui/Components/Routes';
import { Link } from '@reach/router';

export interface NavItemType {
  ID: number;

  children?: NavItemType[];
}

export const handleNavItems = (routes: NavItem[]): JSX.Element[] =>
  routes.map(route =>
    route.children ? (
      <CollapsibleList key={route.label} handle={<SimpleListItem text={route.label} metaIcon='chevron_right' />}>
        <ListItem key={route.label} onMouseOver={() => route.Loadable.preload()} tag={Link} {...{ to: route.to }}>
          {route.label}
        </ListItem>
        {handleNavItems(route.children)}
      </CollapsibleList>
    ) : (
      <ListItem key={route.label} onMouseOver={() => route.Loadable.preload()} tag={Link} {...{ to: route.to }}>
        {route.label}
      </ListItem>
    ),
  );


const handleNavItemsID = (items: NavItemType[]): NavItem[] => items.map((item) => {
  let returnItem: NavItem;
  const route = routes.find(({ ID }) => ID === item.ID)!
  if (item.children && route.children) return { ...route, children: route.children.filter(({ ID }) => item.children!.some((subItem) => subItem.ID === ID)) };
  return route
})

type NavType = FunctionComponent<{ items: NavItemType[] }>;

export const Nav: NavType = ({ items }) => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const isMobileState = typeof window === 'undefined' ? true : window.matchMedia('(max-width: 640px)').matches;

  const modal = (
    <UniversalPortal selector='#navActions'>
      <TopAppBarNavigationIcon onClick={() => setNavOpen(!navOpen)} icon='menu' />
    </UniversalPortal>
  );

  return (
    <>
      {modal}
      <Drawer id='main-nav' open={navOpen} onClose={() => setNavOpen(false)} dismissible={!isMobileState} modal={isMobileState}>
        <DrawerContent>
          <List>{handleNavItems(handleNavItemsID(items))}</List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Nav