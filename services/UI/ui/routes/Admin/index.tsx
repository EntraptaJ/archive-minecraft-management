// UI/ui/routes/Admin/index.tsx
import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import { AdminLayout } from '~Components/Admin/Layout';
import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.min.css';
import { useMutation } from '@apollo/react-hooks';
import RESTARTGQL from './restartServer.graphql';
import '@material/button/dist/mdc.button.min.css';
import '@material/theme/dist/mdc.theme.css';
import '@rmwc/circular-progress/circular-progress.css';
import { Button } from '@rmwc/button';
import { FormStyle } from '~lib/styles';
import { CircularProgress } from '@rmwc/circular-progress'

interface AdminPageProps extends RouteComponentProps {}

type AdminPageType = FunctionComponent<AdminPageProps>;

const AdminPage: AdminPageType = () => {
  const [restartServer, { loading }] = useMutation(RESTARTGQL);
  return (
    <AdminLayout>
      <div style={FormStyle}>
        <Typography use='headline4'>Admin Portal</Typography>
        <Button label='Restart Server' danger raised onClick={() => restartServer()} icon={loading && <CircularProgress style={{ color: 'white' }} />} />
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
