import React from 'react';
import Loadable from 'react-loadable';

const Loader = () => <div>Loader</div>;

const HomeRoute = Loadable({
  loader: () => import('~routes/Home'),
  modules: ['routes/Home/index.tsx'],
  loading: Loader,
  delay: 500,
});

const LoginRoute = Loadable({
  loader: () => import('~routes/Authenication'),
  modules: ['routes/Authenication/index.tsx'],
  loading: Loader,
  delay: 500,
});

const ModsRoute = Loadable({
  loader: () => import('~routes/Mods'),
  modules: ['routes/Mods/index.tsx'],
  loading: Loader,
  delay: 500,
});

export interface ChildNavItem {
  label: string;
  path: string;
  component: typeof HomeRoute;
}

interface ParentNavItem {
  label: string;
  path: string;
  options: NavItem[];
}

export type NavItem = ChildNavItem | ParentNavItem;

export const routes: NavItem[] = [
  { label: 'Home', path: '/', component: HomeRoute },
  { label: 'Mods', path: '/mods', component: ModsRoute },
  { label: 'Login', path: '/login', component: LoginRoute },
];
