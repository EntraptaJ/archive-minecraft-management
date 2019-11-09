// UI/ui/routes/Admin/Mods.tsx
import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { AdminModManagement } from 'ui/Components/Admin/Mods';
import { Layout } from 'ui/Components/Layout';

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
