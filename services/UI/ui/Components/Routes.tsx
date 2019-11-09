import { FunctionComponent, ComponentClass } from 'react';
import Load, { LoadableComponent, OptionsWithoutRender } from 'react-loadable';
import { RouteComponentProps } from '@reach/router';
import { LoadingProgress } from './Loading';

export const MyLoadable = (opts: Omit<OptionsWithoutRender<unknown>, 'loading' | 'delay' | 'timeout'>) =>
  Load(
    Object.assign(
      {
        loading: LoadingProgress,
        delay: 200,
        timeout: 10000,
      },
      opts,
    ),
  );

export interface NavItem {
  /**
   * ID for API
   */
  ID: number

  /**
   * Label to use in the UI
   */
  label: string;

  /**
   * Path for the router to use
   */
  path: string;

  /**
   * Path for Links and Navigates to use
   */
  to: string;

  /**
   * Wether or not to hide the route from the UI
   * @default false
   */
  hidden?: boolean;

  /**
   * Wether or not to hide main UI elements when route is active
   * @default false
   */
  hideUI?: boolean;

  /**
   * Loadable Component for the Route
   */
  Loadable:
    | ComponentClass<RouteComponentProps> & LoadableComponent
    | FunctionComponent<RouteComponentProps> & LoadableComponent;

  /**
   * Sub routes
   */
  children?: NavItem[];
}

export const routes: NavItem[] = [
  {
    ID: 1,
    label: 'Home',
    path: '/',
    to: '/',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Home'),
      modules: ['routes/Home/index.tsx'],
    }),
  },
  {
    ID: 2,
    label: 'Mods',
    path: 'Mods',
    to: '/Mods',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Mods'),
      modules: ['routes/Mods/index.tsx'],
    }),
  },
  {
    ID: 3,
    label: 'Admin',
    path: 'Admin',
    to: '/Admin',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Admin/Home'),
      modules: ['routes/Admin/Home/index.tsx'],
    }),
    children: [
      {
        ID: 1,
        label: 'Backups',
        path: 'Backups',
        to: '/Admin/Backups',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Admin/Backups'),
          modules: ['routes/Admin/Backups/index.tsx'],
        }),
      },
      {
        ID: 2,
        label: 'Console',
        path: 'Console',
        to: '/Admin/Console',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Admin/ServerConsole'),
          modules: ['routes/Admin/ServerConsole/index.tsx'],
        }),
      },
      {
        ID: 3,
        label: 'Mod Management',
        path: 'Mods',
        to: '/Admin/Mods',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Admin/Mods'),
          modules: ['routes/Admin/Mods/index.tsx'],
        }),
      },
      {
        ID: 4,
        label: 'Logs',
        path: 'Logs',
        to: '/Admin/Logs',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Admin/ServerLogs'),
          modules: ['routes/Admin/ServerLogs/index.tsx'],
        }),
      },
      {
        ID: 5,
        label: 'Search Mods',
        path: 'SearchMods',
        to: '/Admin/SearchMods',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Admin/SearchMods'),
          modules: ['routes/Admin/SearchMods/index.tsx'],
        }),
      },
      {
        ID: 6,
        label: 'Configure Mods',
        path: 'ConfigMods',
        to: '/Admin/ConfigMods',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Admin/ConfigMods'),
          modules: ['routes/Admin/ConfigMods/index.tsx'],
        }),
      },
      {
        ID: 7,
        label: 'Tell Raw',
        path: 'TellRaw',
        to: '/Admin/TellRaw',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Admin/TellRaw'),
          modules: ['routes/Admin/TellRaw/index.tsx'],
        }),
      },
      {
        ID: 8,
        label: 'Settings',
        path: 'Settings',
        to: '/Admin/Settings',
        Loadable: MyLoadable({
          loader: () => import('ui/routes/Admin/Settings'),
          modules: ['routes/Admin/Settings/index.tsx'],
        }),
      },
    ],
  },
  {
    ID: 4,
    label: 'Login',
    path: '/Login',
    to: '/Login',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Authenication/Login'),
      modules: ['routes/Authenication/Login/index.tsx'],
    }),
  },
  {
    ID: 5,
    label: 'Register',
    path: '/Register',
    to: '/Register',
    Loadable: MyLoadable({
      loader: () => import('ui/routes/Authenication/Register'),
      modules: ['routes/Authenication/Login/index.tsx'],
    }),
  },
];
