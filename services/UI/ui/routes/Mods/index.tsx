// UI/ui/routes/Mods/index.tsx
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List, ListItem } from '@rmwc/list';
import { Button } from '@rmwc/button';
import MODSGQL from './Mods.graphql';
import '@material/list/dist/mdc.list.min.css';
import '@material/button/dist/mdc.button.min.css';
import { MainStyle, TallMainStyle } from '~lib/styles';
import { FormStyle } from '~routes/Home/Styles';
import { Typography } from '@rmwc/typography';

const ModsPage = () => {
  const { data, loading } = useQuery<{ listMods: string[] }>(MODSGQL);
  if (loading) return <div style={MainStyle}>Loading</div>;
  else if (data && data.listMods)
    return (
      <div style={TallMainStyle}>
        <div style={{ ...FormStyle, marginTop: '1.5em', marginBottom: '1.5em' }}>
          <Typography use='headline4'>Minecraft Server</Typography>
          <Button onClick={() => (window.location.href = '/mods.zip')} raised label='Download Mods Zip' />
          {data.listMods.length > 0 ? (
            <List>
              {data.listMods.map(mod => (
                <ListItem onClick={() => (window.location.href = `/downloadMod/${mod}`)} key={mod}>
                  {mod}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography use='body1'>No mods are installed</Typography>
          )}
        </div>
      </div>
    );
  else
    return (
      <div style={MainStyle}>
        <div style={FormStyle}>
          <Typography use='headline4'>Error</Typography>
        </div>
      </div>
    );
};

export default ModsPage;
