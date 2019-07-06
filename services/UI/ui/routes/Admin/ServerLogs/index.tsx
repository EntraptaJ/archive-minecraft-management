// UI/ui/routes/Admin/ServerLogs/index.tsx
import React from 'react';
import { Layout } from '~Components/Layout';
import { LogBox } from '~Components/Admin/LogBox';

const AdminLogRoute = () => {
  return (
    <Layout admin>
      <LogBox />
    </Layout>
  );
};

export default AdminLogRoute;
