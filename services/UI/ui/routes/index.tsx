import React, { ReactNode, useContext, CSSProperties } from 'react';
import { Router } from '@reach/router';
import { routes, NavItem } from '~Components/Routes';

const HandleRoutes = (routes: NavItem[], parent?: string): ReactNode => {
  return routes.map(Route =>
    'options' in Route ? (
      HandleRoutes(Route.options, Route.path)
    ) : (
      <Route.component
        path={parent ? `${parent}${Route.path}` : Route.path.replace(/(?<=\S)\//, '/*')}
        key={parent ? `${parent}${Route.path}` : Route.path}
      />
    ),
  );
};

export const Routes = () => {
  const MainStyle: CSSProperties = {
    height: '100%'
  };

  return <Router style={MainStyle}>{HandleRoutes(routes)}</Router>;
};
