// UI/ui/routes/Admin/ServerLogs/index.tsx
import React from 'react';
import { LogBox } from 'ui/Components/Admin/LogBox';
import { Layout } from 'ui/Components/Layout';

const AdminLogRoute = () => {
  return (
    <Layout admin>
      <LogBox />
    </Layout>
  );
};

export default AdminLogRoute;
