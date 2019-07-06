// API/src/API/UI/index.ts
import { Resolver, Query, Ctx } from 'type-graphql';
import { MenuItem } from './MenuItemType';
import { Role } from '../../Models/User';
import { ContextType } from '../Context';

interface Menus {
  role: Role;
  menu: MenuItem[];
}

const MainMenu: MenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
];

const UserMenu: MenuItem[] = [{ label: 'Home', path: '/' }, { label: 'Mods', path: '/mods' }];

const AdminMenu: MenuItem[] = [
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

@Resolver()
export default class UIResolver {
  @Query(returns => [MenuItem])
  public async getMenu(@Ctx() { user }: ContextType): Promise<MenuItem[]> {
    if (!user) return MainMenu;
    if (user.roles.includes('Admin')) return AdminMenu;
    return UserMenu;
  }
}
