// UI/ui/Components/Admin/Mods/index.tsx
import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { List, ListItemMeta, ListItem } from '@rmwc/list';
import MODSGQL from './Mods.graphql';
import '@material/list/dist/mdc.list.min.css';
import '@material/menu/dist/mdc.menu.min.css';
import '@material/menu-surface/dist/mdc.menu-surface.min.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FormStyle } from '~lib/styles';
import { MenuSurfaceAnchor, Menu, MenuItem } from '@rmwc/menu';
import './style.css';
import UPLOADMODGQL from './UploadMod.graphql';

interface ModItemProps {
  name: string;
}

type ModItemType = FunctionComponent<ModItemProps>;

const ModItem: ModItemType = ({ name }) => {
  const [open, setOpen] = useState(false);

  return (
    <MenuSurfaceAnchor style={{ width: '100%' }}>
      <ListItem style={{ width: '92%' }}>
        {name}
        <ListItemMeta icon='menu' onClick={() => setOpen(!open)} />
      </ListItem>

      <Menu
        open={open}
        onSelect={evt => console.log(evt.detail.index)}
        onClose={evt => setOpen(false)}
        style={{ right: 0, left: 'unset' }}
      >
        <MenuItem>Delete</MenuItem>
        <MenuItem>Disable</MenuItem>
      </Menu>
      {/** The handle can be any component you want */}
    </MenuSurfaceAnchor>
  );
};

export const AdminModManagement = () => {
  const { data, loading } = useQuery<{ listMods: string[] }>(MODSGQL);
  const [uploadMod] = useMutation<{}, { file: any }>(UPLOADMODGQL);
  return (
    <List style={{ ...FormStyle, margin: '0 1em 0 1em', marginTop: '1em', marginBottom: '1em' }}>
      {loading ? (
        <ListItem>Loading</ListItem>
      ) : data ? (
        data.listMods.map(mod => <ModItem name={mod} />)
      ) : (
        <ListItem>Error</ListItem>
      )}

      <div className='upload-btn-wrapper'>
        <button className='btn'>Upload a Mod</button>
        <input
          type='file'
          name='myfile'
          required
          onChange={({ target: { validity, files } }: ChangeEvent<HTMLInputElement>) =>
            validity.valid && uploadMod({ variables: { file: files![0] } })
          }
        />
      </div>
    </List>
  );
};
