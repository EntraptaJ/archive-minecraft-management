// UI/ui/Components/Admin/Layout.tsx
import React, { FunctionComponent } from 'react';
import { NavBar } from '../NavBar';
import '@material/theme/dist/mdc.theme.min.css';
import { MainStyle } from '~lib/styles';
import { DrawerAppContent } from '@rmwc/drawer';

interface LayoutProps {
  tall?: boolean;
}

type LayoutType = FunctionComponent<LayoutProps>;

export const Layout: LayoutType = ({ children }) => {
  return (
    <>
      <NavBar />
      <DrawerAppContent tag='main' className='app__content' style={MainStyle}>
        {children}
      </DrawerAppContent>
    </>
  );
};
