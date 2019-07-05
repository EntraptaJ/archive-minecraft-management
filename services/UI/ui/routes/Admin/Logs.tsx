// UI/ui/routes/Admin/Logs.tsx
import React from 'react';
import { AdminLayout } from '~Components/Admin/Layout';
import { LogBox } from '~Components/Admin/LogBox';

const AdminLogRoute = () => {
  return (
    <AdminLayout>
      <LogBox />
    </AdminLayout>
  );
};

export default AdminLogRoute;
