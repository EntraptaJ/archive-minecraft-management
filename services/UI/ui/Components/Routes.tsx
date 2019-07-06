import Loadable from 'react-loadable';
import { LoadingProgress } from './Loading';

const HomeRoute = Loadable({
  loader: () => import('~routes/Home'),
  modules: ['routes/Home/index.tsx'],
  loading: LoadingProgress,
});

const LoginRoute = Loadable({
  loader: () => import('~routes/Authenication/Login'),
  modules: ['routes/Authenication/Login/index.tsx'],
  loading: LoadingProgress,
});

const RegisterRoute = Loadable({
  loader: () => import('~routes/Authenication/Register'),
  modules: ['routes/Authenication/Login/index.tsx'],
  loading: LoadingProgress,
});

const ModsRoute = Loadable({
  loader: () => import('~routes/Mods'),
  modules: ['routes/Mods/index.tsx'],
  loading: LoadingProgress,
});

const AdminRoute = Loadable({
  loader: () => import('~routes/Admin/index'),
  modules: ['routes/Admin/index.tsx'],
  loading: LoadingProgress,
});

const AdminChatRoute = Loadable({
  loader: () => import('~Components/Admin/ChatBox/index'),
  modules: ['Components/Admin/ChatBox/index.tsx'],
  loading: LoadingProgress,
});

const AdminModRoute = Loadable({
  loader: () => import('~routes/Admin/Mods'),
  modules: ['routes/Admin/Mods.tsx'],
  loading: LoadingProgress,
});

const AdminConfigModRoute = Loadable({
  loader: () => import('~routes/Admin/ConfigMod'),
  modules: ['routes/Admin/ConfigMod.tsx'],
  loading: LoadingProgress,
});

const AdminLogsRoute = Loadable({
  loader: () => import('~routes/Admin/Logs'),
  modules: ['routes/Admin/Logs.tsx'],
  loading: LoadingProgress,
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
  {
    label: 'Admin',
    path: '/Admin',
    options: [
      { label: 'Main', path: '/', component: AdminRoute },
      { label: 'Console', path: '/Console', component: AdminChatRoute },
      { label: 'Server Logs', path: '/Logs', component: AdminLogsRoute },
      { label: 'Mods Management', path: '/Mods', component: AdminModRoute },
      { label: 'Configure Mods', path: '/ConfigMods', component: AdminConfigModRoute },
    ],
  },
  { label: 'Login', path: '/login', component: LoginRoute },
  { label: 'Register', path: '/register', component: RegisterRoute },
];
