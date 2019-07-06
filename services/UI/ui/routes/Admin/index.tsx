// UI/ui/routes/Admin/index.tsx
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { AdminLayout } from '~Components/Admin/Layout';
import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.min.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import STARTGQL from './startServer.graphql';
import STATUSGQL from './serverStatus.graphql';
import RESTARTGQL from './restartServer.graphql';
import '@material/button/dist/mdc.button.min.css';
import '@material/theme/dist/mdc.theme.css';
import '@rmwc/circular-progress/circular-progress.css';
import { Button } from '@rmwc/button';
import { FormStyle } from '~lib/styles';
import { CircularProgress } from '@rmwc/circular-progress';

interface AdminPageProps extends RouteComponentProps {}

type AdminPageType = FunctionComponent<AdminPageProps>;

interface getStatus {
  online: boolean;
}

const AdminPage: AdminPageType = () => {
  const [restartServer, { loading: restartLoading }] = useMutation(RESTARTGQL);
  const [startServer, { loading: startLoading }] = useMutation(STARTGQL);
  const { data } = useQuery<{ getStatus: getStatus }>(STATUSGQL);
  if (!data || typeof data.getStatus === 'undefined')
    return (
      <AdminLayout>
        <div style={FormStyle}>
          <Typography use='headline4'>Loading</Typography>
        </div>
      </AdminLayout>
    );
  return (
    <AdminLayout>
      <div style={FormStyle}>
        <Typography use='headline4'>Admin Portal</Typography>
        {data.getStatus.online ? (
          <>
            {' '}
            <Button
              label='Restart Server'
              danger
              raised
              onClick={() => restartServer()}
              icon={restartLoading && <CircularProgress style={{ color: 'white' }} />}
            />
          </>
        ) : (
          <Button
            label='Start Server'
            raised
            style={{ backgroundColor: 'green' }}
            onClick={() => startServer()}
            icon={startLoading && <CircularProgress style={{ color: 'white' }} />}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
