// UI/ui/routes/Admin/Mods.tsx
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Layout } from '~Components/Layout';
import '@material/typography/dist/mdc.typography.min.css';
import { AdminModManagement } from '~Components/Admin/Mods';

interface AdminPageProps extends RouteComponentProps {}

type AdminPageType = FunctionComponent<AdminPageProps>;

const AdminPage: AdminPageType = () => {
  return (
    <Layout admin>
      <AdminModManagement />
    </Layout>
  );
};

export default AdminPage;
