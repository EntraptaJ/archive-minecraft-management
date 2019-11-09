// UI/ui/routes/Admin/Home/index.tsx
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from '@reach/router';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { Typography } from '@rmwc/typography';
import React, { FunctionComponent } from 'react';
import { RestartServer } from 'ui/Components/Admin/RestartServer';
import { StopServer } from 'ui/Components/Admin/StopServer';
import { Layout } from 'ui/Components/Layout';
import { FormStyle } from 'ui/lib/styles';
import SENDFMLGQL from './sendFMLConfirm.graphql';
import STATUSGQL from './serverStatus.graphql';
import STARTGQL from './startServer.graphql';

interface AdminPageProps extends RouteComponentProps {}

type AdminPageType = FunctionComponent<AdminPageProps>;

interface getStatus {
  online: boolean;
  health: string;
}

const AdminPage: AdminPageType = () => {
  const [startServer, { loading: startLoading }] = useMutation(STARTGQL);
  const [sendFML, { loading: fmlLoading }] = useMutation(SENDFMLGQL);
  const { data } = useQuery<{ getStatus: getStatus }>(STATUSGQL);
  return (
    <Layout admin>
      <div style={FormStyle}>
        <Typography use='headline4'>Admin Portal</Typography>
        {data && data.getStatus ? (
          <>
            {' '}
            {data.getStatus.online ? (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <StopServer />
                <RestartServer />
              </div>
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
          </>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default AdminPage;
