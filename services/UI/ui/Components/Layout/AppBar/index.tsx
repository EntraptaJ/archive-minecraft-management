// UI/ui/Components/Layout/AppBar/index.tsx
import { Link } from '@reach/router';
import { TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@rmwc/top-app-bar';
import React, { FunctionComponent } from 'react';
import './AppBar.css';

interface AppBarProps {
  appName: string;
}

type AppBarType = FunctionComponent<AppBarProps>;

export const AppBar: AppBarType = ({ appName }) => {
  return (
    <>
      <TopAppBar fixed className='app__top-app-bar'>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <section id='navActions'>
              <></>
            </section>
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

export default AppBar;