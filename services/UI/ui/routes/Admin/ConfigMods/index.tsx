// UI/ui/routes/Admin/ConfigMods/index.tsx
import React from 'react';
import { AdminModConfigView } from 'ui/Components/Admin/ConfigView';
import { Layout } from 'ui/Components/Layout';

const ConfigModRoute = () => {
  return (
    <Layout admin>
      <AdminModConfigView />
    </Layout>
  );
};

export default ConfigModRoute;
