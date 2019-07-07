// UI/ui/Components/Admin/Layout.tsx
import React, { FunctionComponent, useContext } from 'react';
import '@material/theme/dist/mdc.theme.min.css';
import { MainStyle } from '~lib/styles';
import { DrawerAppContent } from '@rmwc/drawer';
import { getProp, PropContext } from '~Prop';
import ISADMINGQL from './isAdmin.graphql';
import { Redirect } from '@reach/router';
import { LoadingProgress } from '~Components/Loading';
import '@material/drawer/dist/mdc.drawer.min.css';

interface LayoutProps {
  admin?: boolean;
}

type LayoutType = FunctionComponent<LayoutProps>;

const getAdminProps: getProp = async (req, client) => {
  if (!client) return;
  try {
    const isAdmin = await client.query<{ isAdmin: boolean }>({ query: ISADMINGQL, errorPolicy: 'all' });
    if (!isAdmin.data) return { admin: false };
    else if (isAdmin.data.isAdmin === true) return { admin: true };
    else return { admin: false };
  } catch {
    return { admin: false };
  }
};

export const Layout: LayoutType = ({ children, admin = false }) => {
  const { useProps, props } = useContext(PropContext);

  useProps(admin ? getAdminProps : async () => {});

  if (!admin || props.admin === true) return <>{children}</>;
  else if (admin && props.admin === false) return <Redirect to='/' />;
  else return <LoadingProgress />;
};
