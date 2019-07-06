// UI/ui/routes/Admin/ServerConsole/index.tsx
import React from 'react';
import { Layout } from '~Components/Layout';
import { AdminServerConsoleBox } from '~Components/Admin/ConsoleBox';

const AdminLogRoute = () => {
  return (
    <Layout admin>
      <AdminServerConsoleBox />
    </Layout>
  );
};

export default AdminLogRoute;
