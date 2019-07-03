// UI/ui/routes/Home/index.tsx
import React from 'react';
import { Typography } from '@rmwc/typography';
import { RouteComponentProps } from '@reach/router';
import '@material/typography/dist/mdc.typography.css';
import '@material/list/dist/mdc.list.min.css';
import { MainStyle, FormStyle } from '~lib/styles';
import MCSTATUSGQL from './MCStatus.graphql'
import { List, ListItem } from '@rmwc/list'
import { useQuery } from '@apollo/react-hooks';

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
        <List>
        {data.getStatus.players.map((user) => <ListItem>{user}</ListItem>)}
        </List>
      </div>
    </div>
  );
  else return <div>Error</div>
};
export default HomeRoute;
