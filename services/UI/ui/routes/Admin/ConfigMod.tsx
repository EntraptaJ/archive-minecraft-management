// UI/ui/routes/Admin/ConfigMod.tsx
import React from 'react';
import { AdminLayout } from '~Components/Admin/Layout';
import { AdminModConfigView } from '~Components/Admin/ConfigView';

const ConfigModRoute = () => {
  return (
    <AdminLayout>
      <AdminModConfigView />
    </AdminLayout>
  );
};

export default ConfigModRoute;
