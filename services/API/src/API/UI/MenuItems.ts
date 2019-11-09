// API/src/API/UI/MenuItems.ts
import { MenuItem } from './MenuItemType';

export const MainMenu: MenuItem[] = [
  { ID: 1 },
  { ID: 2 },
  { ID: 4 },
  { ID: 5 },
];

export const UserMenu: MenuItem[] = [{ ID: 1 }, { ID: 2 }];

export const AdminMenu: MenuItem[] = [
  ...UserMenu,
  {
    ID: 3,
    children: [
      { ID: 1 },
      { ID: 2 },
      { ID: 3 },
      { ID: 4 },
      { ID: 5 },
      { ID: 6 },
      { ID: 7 },
      { ID: 8 }
    ],
  },
];
