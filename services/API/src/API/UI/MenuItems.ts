// API/src/API/UI/MenuItems.ts
import { MenuItem } from './MenuItemType';

export const MainMenu: MenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
];

export const UserMenu: MenuItem[] = [{ label: 'Home', path: '/' }, { label: 'Mods', path: '/mods' }];

export const AdminMenu: MenuItem[] = [
  ...UserMenu,
  {
    label: 'Admin',
    path: '/Admin',
    children: [
      { label: 'Main', path: '/Admin' },
      { label: 'Server Console', path: '/Admin/Console' },
      { label: 'Server Logs', path: '/Admin/Logs' },
      { label: 'Mod Management', path: '/Admin/Mods' },
      { label: 'Configure Mods', path: '/Admin/ConfigMods' },
    ],
  },
];