// UI/ui/routes/Home/index.tsx
import React, { FunctionComponent } from 'react';
import { Typography } from '@rmwc/typography';
import { RouteComponentProps, navigate } from '@reach/router';
import '@material/typography/dist/mdc.typography.min.css';
import '@material/button/dist/mdc.button.min.css';
import '@material/list/dist/mdc.list.min.css';
import { FormStyle } from '~lib/styles';
import GETSTATUSGQL from './getStatus.graphql';
import { List, ListItem } from '@rmwc/list';
import { useQuery } from '@apollo/react-hooks';
import { Button } from '@rmwc/button';
import { Layout } from '~Components/Layout';
import { LoadingProgress } from '~Components/Loading';

interface Status {
  online: boolean;
  MCState: {
    online_players: number;
    players: string[];
  };
}

type PlayerListType = FunctionComponent<{ players: string[] }>;

const PlayerList: PlayerListType = ({ players }) => (
  <List>
    {players.map(playerName => (
      <ListItem key={playerName}>{playerName}</ListItem>
    ))}
  </List>
);

const HomeRoute: FunctionComponent<RouteComponentProps> = () => {
  const { data, loading } = useQuery<{ getStatus: Status }>(GETSTATUSGQL);
  return (
    <Layout>
      <div style={FormStyle}>
        <Typography use='headline4'>Minecraft Server</Typography>
        <Button onClick={() => navigate('/mods')} raised label='Mods' />
        {data && data.getStatus ? (
          data.getStatus.online === false ? (
            <Typography use='body1'>Server is Offline</Typography>
          ) : data.getStatus.MCState.players.length > 0 ? (
            <PlayerList players={data.getStatus.MCState.players} />
          ) : (
            <Typography use='body1'>No one is online</Typography>
          )
        ) : loading ? (
          <LoadingProgress />
        ) : (
          <Typography use='body1'>Issue fetching data from server</Typography>
        )}
      </div>
    </Layout>
  );
};
export default HomeRoute;
