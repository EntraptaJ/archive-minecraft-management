// UI/ui/routes/Admin/ServerConsole/index.tsx
import React from 'react';
import { AdminServerConsoleBox } from 'ui/Components/Admin/ConsoleBox';
import { Layout } from 'ui/Components/Layout';

const AdminLogRoute = () => {
  return (
    <Layout admin>
      <AdminServerConsoleBox />
    </Layout>
  );
};

export default AdminLogRoute;
