// UI/ui/routes/Mods/index.tsx
import { useQuery } from '@apollo/react-hooks';
import { Button } from '@rmwc/button';
import { List, ListItem } from '@rmwc/list';
import { Typography } from '@rmwc/typography';
import React from 'react';
import { Layout } from 'ui/Components/Layout';
import { LoadingProgress } from 'ui/Components/Loading';
import { FormStyle } from 'ui/lib/styles';
import './Mods.css';
import MODSGQL from './Mods.graphql';

interface ModType {
  name: string;
  fileName: string;
  disabled: boolean;
}

const ModsPage = () => {
  const { data, loading } = useQuery<{ listMods: ModType[] }>(MODSGQL);
  if (loading) return <LoadingProgress />;
  else if (data && data.listMods)
    return (
      <Layout>
        <div style={FormStyle}>
          <Typography use='headline4'>Minecraft Server</Typography>
          <Button onClick={() => (window.location.href = '/mods.zip')} raised label='Download Mods Zip' />
          {data.listMods.length > 0 ? (
            <List>
              {data.listMods.map(({ name, fileName, disabled }) => (
                <ListItem disabled={disabled} onClick={() => (window.location.href = `/downloadMod/${fileName}`)} key={name}>
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
