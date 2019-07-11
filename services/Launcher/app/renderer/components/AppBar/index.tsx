// UI/ui/Components/Layout/AppBar/index.tsx
import React, { FunctionComponent } from 'react';
import {
  TopAppBar,
  TopAppBarNavigationIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
} from '@rmwc/top-app-bar';
import { Link } from '@reach/router';

import '@material/top-app-bar/dist/mdc.top-app-bar.min.css';

interface AppBarProps {
  appName: string;
}

type AppBarType = FunctionComponent<AppBarProps>;

export const AppBar: AppBarType = ({ children, appName }) => {
  return (
    <>
      <TopAppBar fixed className='app__top-app-bar'>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon icon='menu' />
            <TopAppBarTitle tag={Link} {...{ to: '/' }}>
              {appName}
            </TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </>
  );
};
