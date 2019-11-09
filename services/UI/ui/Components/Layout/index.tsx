// UI/ui/Components/Admin/Layout.tsx
import { Redirect } from '@reach/router';
import React, { FunctionComponent, useContext } from 'react';
import { getProp, PropContext } from 'ui/Components/PropProvider';
import ISADMINGQL from './isAdmin.graphql';
import './Layout.css';

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

  useProps(admin === true ? getAdminProps : async () => {});

  if (!admin || props.admin === true) return <>{children}</>;
  else if (admin && props.admin === false) return <Redirect to='/' />;
  else return <></>;
};
