// UI/ui/Components/NavBar/NavItem/handleItems.tsx
import React from 'react';
import { CollapsibleList, SimpleListItem } from '@rmwc/list';
import { NavItemType } from '../types';
import { NavItem } from '.';

export const handleNavItems = (items: NavItemType[]): JSX.Element[] =>
  items.map(item =>
    item.children ? (
      <CollapsibleList key={item.label} handle={<SimpleListItem text={item.label} metaIcon='chevron_right' />}>
        {handleNavItems(item.children)}
      </CollapsibleList>
    ) : (
      <NavItem key={item.label} {...item} />
    ),
  );
