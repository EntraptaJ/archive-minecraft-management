// UI/ui/routes/Admin/Settings/index.tsx
import React, { FunctionComponent } from 'react';
import { Settings, AdminSettings } from '~Components/Admin/Settings';
import { RouteComponentProps } from '@reach/router';
import GETSETTINGSGQL from './getSettings.graphql';
import { useQuery } from '@apollo/react-hooks';
import { Layout } from '~Components/Layout';
import { LoadingProgress } from '~Components/Loading';

interface AdminSettingsRouteProps extends RouteComponentProps {}

type AdminSettingsRouteType = FunctionComponent<AdminSettingsRouteProps>;

const AdminSettingsRoute: AdminSettingsRouteType = () => {
  const { data } = useQuery<{ getSettings: Settings }>(GETSETTINGSGQL);
  return <Layout admin>{data && data.getSettings ? <AdminSettings {...data.getSettings} /> : <LoadingProgress />}</Layout>;
};

export default AdminSettingsRoute;
