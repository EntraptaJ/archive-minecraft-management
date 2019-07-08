// UI/ui/Components/Admin/BackupList/index.tsx
import React, { FunctionComponent, useState } from 'react';

import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.min.css';
import '@material/menu-surface/dist/mdc.menu-surface.min.css';
import '@material/dialog/dist/mdc.dialog.min.css';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { List, ListItem, ListItemMeta, ListItemText, ListItemPrimaryText, ListItemSecondaryText } from '@rmwc/list';
import { MenuSurfaceAnchor, Menu, MenuItem } from '@rmwc/menu';
import { Dialog, DialogTitle, DialogActions, DialogButton, DialogContent } from '@rmwc/dialog';

interface Backup {
  name: string;
  folderName: string;
  date: Date;
}


interface BackupListProps {
  data: {
    getBackups: Backup[]
  } | undefined
}

type BackupListType = FunctionComponent<BackupListProps>;


interface BackupRowProps extends Backup {}

type BackupRowType = FunctionComponent<BackupRowProps>;

/**
 *
 * @param param0 
 * 
 *     <DataTableRow>
      <DataTableCell>{name}</DataTableCell>
      <DataTableCell>{moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</DataTableCell>
    </DataTableRow>
 */

const BackupRow: BackupRowType = ({ name, date }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<boolean>(false);
  return (
    <>
      <MenuSurfaceAnchor style={{ width: '100%' }}>
        <ListItem style={{ width: '92%' }}>
          <ListItemText>
            <ListItemPrimaryText>{name}</ListItemPrimaryText>
            <ListItemSecondaryText>{moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</ListItemSecondaryText>
          </ListItemText>
          <ListItemMeta icon='menu' onClick={() => setOpen(!open)} />
        </ListItem>
        <Menu open={open} onClose={evt => setOpen(false)} style={{ right: 0, left: 'unset' }}>
          <MenuItem>Restore Backup</MenuItem>
        </Menu>
      </MenuSurfaceAnchor>
      <Dialog
        open={dialog}
        onClose={evt => {
          setDialog(false);
        }}
      >
        <DialogTitle>New Backup</DialogTitle>
        <DialogContent>Create new Backup</DialogContent>
        <DialogActions>
          <DialogButton action='close'>Cancel</DialogButton>
          <DialogButton action='confirm' isDefaultAction>
            Create Backup
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};


export const BackupList: BackupListType = ({ data }) => {
  
  return (
    <List twoLine style={{ width: '100%', marginBottom: '1em' }}>
      {data && data.getBackups ? data.getBackups.map(backup => <BackupRow {...backup} key={backup.date.toString()} />) : <ListItem>Loading</ListItem>}
    </List>
  );
};

/**
 * 
 *     <DataTable>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell>Name</DataTableHeadCell>
            <DataTableHeadCell>Date</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {data && data.getBackups ? (
            data.getBackups.map(backup => <BackupRow {...backup} />)
          ) : (
            <DataTableRow>
              <DataTableCell>Loading</DataTableCell>
              <DataTableCell>Loading</DataTableCell>
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
 */
