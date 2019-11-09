// UI/ui/routes/Admin/Settings/index.tsx
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { AdminSettings, Settings } from 'ui/Components/Admin/Settings';
import { Layout } from 'ui/Components/Layout';
import { LoadingProgress } from 'ui/Components/Loading';
import GETSETTINGSGQL from './getSettings.graphql';

interface AdminSettingsRouteProps extends RouteComponentProps {}

type AdminSettingsRouteType = FunctionComponent<AdminSettingsRouteProps>;

const AdminSettingsRoute: AdminSettingsRouteType = () => {
  const { data } = useQuery<{ getSettings: Settings }>(GETSETTINGSGQL);
  return <Layout admin>{data && data.getSettings ? <AdminSettings {...data.getSettings} /> : <LoadingProgress />}</Layout>;
};

export default AdminSettingsRoute;
