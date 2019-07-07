// UI/ui/Components/Layout/Nav/NavItem/index.tsx
import React, { FunctionComponent, useState } from 'react';
import { ListItem } from '@rmwc/list';
import { routes, NavItem as RouteItem } from '~Components/Routes';
import { navigate } from '@reach/router';

const findRoute = (path: string) => {
  let routeItem: RouteItem | undefined;
  routes.map(route => {
    if ('options' in route)
      routeItem = route.options.find(route2 => `${route.path}${route2.path}` === path || route.path === path);
    else if (route.path === path) routeItem = route;
  });
  return routeItem;
};

interface NavItemProps {
  label: string;

  path: string;
}

type NavItemType = FunctionComponent<NavItemProps>;

export const NavItem: NavItemType = ({ label, path }) => {
  const RouteItem = findRoute(path);
  if (!RouteItem) return <ListItem onClick={() => navigate(path)}>{label}</ListItem>;
  return (
    <ListItem onMouseOver={() => 'component' in RouteItem && RouteItem.component.preload()} onClick={() => navigate(path)}>
      {label}
    </ListItem>
  );
};
