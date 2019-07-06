// UI/ui/routes/Admin/ConfigMods/index.tsx
import React from 'react';
import { Layout } from '~Components/Layout';
import { AdminModConfigView } from '~Components/Admin/ConfigView';

const ConfigModRoute = () => {
  return (
    <Layout admin>
      <AdminModConfigView />
    </Layout>
  );
};

export default ConfigModRoute;
