import React, { ReactNode } from 'react';
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

  return <Router style={{ minHeight: '100%', display: 'flex', flexDirection: 'column'}}>{HandleRoutes(routes)}</Router>;
};
