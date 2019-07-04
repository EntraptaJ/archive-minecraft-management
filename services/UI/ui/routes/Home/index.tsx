// UI/ui/routes/Home/index.tsx
import React from 'react';
import { Typography } from '@rmwc/typography';
import { RouteComponentProps, navigate } from '@reach/router';
import '@material/typography/dist/mdc.typography.min.css';
import '@material/button/dist/mdc.button.min.css';
import '@material/list/dist/mdc.list.min.css';
import { MainStyle, FormStyle } from '~lib/styles';
import MCSTATUSGQL from './MCStatus.graphql'
import { List, ListItem } from '@rmwc/list'
import { useQuery } from '@apollo/react-hooks';
import { Button } from '@rmwc/button';

interface MCStatus {
  online_players: number

  port: string

  players: string[]
}

const HomeRoute: React.FunctionComponent<RouteComponentProps> = () => {
  const { data, loading } = useQuery<{ getStatus: MCStatus }>(MCSTATUSGQL)
  if (loading) return <div>Loading</div>
  if (data && data.getStatus) return (
    <div style={MainStyle}>
      <div style={FormStyle}>
        <Typography use='headline4'>Minecraft Server</Typography>
        <Button onClick={() => navigate('/mods')} raised label='Mods' />
        {data.getStatus.players.length > 0 ? <List>{data.getStatus.players.map((user) => <ListItem key={user}>{user}</ListItem>)}</List> : <Typography use='body1'>No one is Online</Typography>}
      </div>
    </div>
  );
  else return <div>Error</div>
};
export default HomeRoute;
