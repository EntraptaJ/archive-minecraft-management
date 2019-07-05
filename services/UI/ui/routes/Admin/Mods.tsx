// UI/ui/routes/Admin/Mods.tsx
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { AdminLayout } from '~Components/Admin/Layout';
import '@material/typography/dist/mdc.typography.min.css';
import { AdminModManagement } from '~Components/Admin/Mods';
import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';

interface AdminPageProps extends RouteComponentProps {}

type AdminPageType = FunctionComponent<AdminPageProps>;

const AdminPage: AdminPageType = () => {
  return (
    <AdminLayout>
      <AdminModManagement />
    </AdminLayout>
  );
};

export default AdminPage;
