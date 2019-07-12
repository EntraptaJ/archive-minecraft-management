// Launcher/app/renderer/components/Layout/NavBar/NavItem/index.tsx
import React, { FunctionComponent } from 'react';
import { ListItem } from '@rmwc/list';
import { navigate } from '../../../../router';

interface NavItemProps {
  label: string;

  path: string;
}

type NavItemType = FunctionComponent<NavItemProps>;

export const NavItem: NavItemType = ({ label, path }) => {
  return (
    <ListItem onClick={() => navigate(path)}>
      {label}
    </ListItem>
  );
};
