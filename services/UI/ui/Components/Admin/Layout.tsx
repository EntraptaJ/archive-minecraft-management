// UI/ui/Components/Admin/Layout.tsx
import React, { FunctionComponent, useContext } from 'react';
import { Redirect } from '@reach/router';
import { NavBar } from '../NavBar';
import { MainStyle, TallMainStyle } from '~lib/styles';
import { PropContext } from '~Prop';
import ISADMINGQL from './checkAdmin.graphql';

interface AdminLayoutProps {
  tall?: boolean
}

type AdminLayoutType = FunctionComponent<AdminLayoutProps>;

export const AdminLayout: AdminLayoutType = ({ children, tall = false }) => {
  const { useProps, props } = useContext(PropContext);
  useProps(async (req, client) => {
    if (!client) {
      console.log('test')
      return
    }
    const isAdmin = await client.query<{ isAdmin: boolean }>({ query: ISADMINGQL, errorPolicy: 'all' });
    if (typeof isAdmin === 'undefined') return { admin: false };
    else if (isAdmin.data.isAdmin === true) return { admin: true };
    else return { admin: false };
  });


  if (props.admin === true)
    return (
      <>
        <NavBar />
        <div style={tall ? TallMainStyle : MainStyle}>{children}</div>
      </>
    );
  else if (props.admin === false) return <Redirect to='/' />;
  else return <div>Loading</div>
};
