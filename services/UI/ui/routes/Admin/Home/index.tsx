// UI/ui/routes/Admin/Home/index.tsx
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Layout } from '~Components/Layout';
import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.min.css';
import { useMutation, useQuery } from '@apollo/react-hooks';
import STARTGQL from './startServer.graphql';
import STATUSGQL from './serverStatus.graphql';
import RESTARTGQL from './restartServer.graphql';
import SENDFMLGQL from './sendFMLConfirm.graphql'
import '@material/button/dist/mdc.button.min.css';
import '@material/theme/dist/mdc.theme.css';
import '@rmwc/circular-progress/circular-progress.css';
import { Button } from '@rmwc/button';
import { FormStyle } from '~lib/styles';
import { CircularProgress } from '@rmwc/circular-progress';
import { LoadingProgress } from '~Components/Loading';

interface AdminPageProps extends RouteComponentProps {}

type AdminPageType = FunctionComponent<AdminPageProps>;

interface getStatus {
  online: boolean;
  health: string;
}

const AdminPage: AdminPageType = () => {
  const [restartServer, { loading: restartLoading }] = useMutation(RESTARTGQL);
  const [startServer, { loading: startLoading }] = useMutation(STARTGQL);
  const [sendFML, { loading: fmlLoading }] = useMutation(SENDFMLGQL);
  const { data } = useQuery<{ getStatus: getStatus }>(STATUSGQL);
  if (!data || typeof data.getStatus === 'undefined')
    return (
      <Layout admin>
        <div style={FormStyle}>
          <LoadingProgress />
        </div>
      </Layout>
    );
  return (
    <Layout admin>
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
        {data.getStatus.health == 'FMLConfirm' && (
          <Button
            label='FML Confirm'
            raised
            style={{ backgroundColor: 'green', marginTop: '1em' }}
            onClick={() => sendFML()}
            icon={fmlLoading && <CircularProgress style={{ color: 'white' }} />}
          />
        )}
      </div>
    </Layout>
  );
};

export default AdminPage;
