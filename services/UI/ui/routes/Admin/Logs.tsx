// UI/ui/routes/Admin/Logs.tsx
import React from 'react';
import { AdminLayout } from '~Components/Admin/Layout';
import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { LogBox } from '~Components/Admin/Logs';

const AdminLogRoute = () => {
  return (
    <AdminLayout>
      <LogBox />
    </AdminLayout>
  );
};

export default AdminLogRoute;
