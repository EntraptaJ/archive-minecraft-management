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

const AdminRoute = Loadable({
  loader: () => import('~routes/Admin/index'),
  modules: ['routes/Admin/index.tsx'],
  loading: Loader,
  delay: 500,
});

const AdminChatRoute = Loadable({
  loader: () => import('~Components/Admin/ChatBox/index'),
  modules: ['Components/Admin/ChatBox/index.tsx'],
  loading: Loader,
  delay: 500
})

const AdminModRoute = Loadable({
  loader: () => import('~routes/Admin/Mods'),
  modules: ['routes/Admin/Mods.tsx'],
  loading: Loader,
  delay: 500
})


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
  { label: 'Admin', path: '/Admin', options: [{ label: 'Main', path: '/', component: AdminRoute },{ label: 'Console', path: '/Console', component: AdminChatRoute }, { label: 'Mods Management', path: '/Mods', component: AdminModRoute }] },
  { label: 'Login', path: '/login', component: LoginRoute },
];
