// UI/ui/routes/Mods/index.tsx
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List, ListItem } from '@rmwc/list';
import { Button } from '@rmwc/button';
import MODSGQL from './Mods.graphql';
import '@material/list/dist/mdc.list.min.css';
import '@material/button/dist/mdc.button.min.css';
import { FormStyle } from '~routes/Home/Styles';
import { Typography } from '@rmwc/typography';
import { LoadingProgress } from '~Components/Loading';
import { Layout } from '~Components/Layout';

interface ModType {
  name: string
  fileName: string
}

const ModsPage = () => {
  const { data, loading } = useQuery<{ listMods: ModType[] }>(MODSGQL);
  if (loading) return <LoadingProgress />;
  else if (data && data.listMods)
    return (
      <Layout>
        <div style={{ ...FormStyle, marginTop: '1.5em', marginBottom: '1.5em' }}>
          <Typography use='headline4'>Minecraft Server</Typography>
          <Button onClick={() => (window.location.href = '/mods.zip')} raised label='Download Mods Zip' />
          {data.listMods.length > 0 ? (
            <List>
              {data.listMods.map(({  name, fileName }) => (
                <ListItem onClick={() => (window.location.href = `/downloadMod/${fileName}`)} key={name}>
                  {name}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography use='body1'>No mods are installed</Typography>
          )}
        </div>
      </Layout>
    );
  else
    return (
      <Layout>
        <div style={FormStyle}>
          <Typography use='headline4'>Error</Typography>
        </div>
      </Layout>
    );
};

export default ModsPage;
