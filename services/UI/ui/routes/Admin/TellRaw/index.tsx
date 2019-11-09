// UI/ui/routes/Admin/TellRaw/index.tsx
import React from 'react';
import { TellRawForm } from 'ui/Components/Admin/TellRaw';
import { Layout } from 'ui/Components/Layout';

const TellRawRoute = () => {
  return (
    <Layout admin>
      <TellRawForm />
    </Layout>
  );
};

export default TellRawRoute;
