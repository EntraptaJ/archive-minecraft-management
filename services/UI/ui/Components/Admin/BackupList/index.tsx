// UI/ui/Components/Admin/BackupList/index.tsx
import React, { FunctionComponent, useState } from 'react';

import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.min.css';
import '@material/menu-surface/dist/mdc.menu-surface.min.css';
import '@material/dialog/dist/mdc.dialog.min.css';
import { useMutation } from '@apollo/react-hooks';
import RESTOREBACKUPGQL from './restoreBackup.graphql';
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
  data:
    | {
        getBackups: Backup[];
      }
    | undefined;
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

const BackupRow: BackupRowType = ({ name, date, folderName }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<boolean>(false);
  const [action, setAction] = useState<'Delete' | 'Restore'>();
  const [restoreBackupFN] = useMutation<{ restoreBackup: boolean }, { folderName: string }>(RESTOREBACKUPGQL);

  const restoreBackup = () => {
    setAction('Restore');
    setDialog(true);
  };

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
          <MenuItem onClick={restoreBackup}>Restore Backup</MenuItem>
        </Menu>
      </MenuSurfaceAnchor>
      <Dialog
        open={dialog}
        onClose={evt => {
          //if (action === 'Delete' && evt.detail.action === 'confirm') console.log('Delete backup')
          if (action === 'Restore' && evt.detail.action === 'confirm')
            restoreBackupFN({
              variables: {
                folderName,
              },
            });
          setDialog(false);
        }}
      >
        <DialogTitle>{`${action} ${name}`}</DialogTitle>
        <DialogContent>
          Are you sure you want to {action} the Backup?
          {action === 'Restore' ? (
            <>
              <br />
              <span style={{ fontWeight: 'bolder' }}>BE CERTAIN SEVRER IS STOPPED</span>
            </>
          ) : (
            ''
          )}
        </DialogContent>
        <DialogActions>
          <DialogButton action='close'>Cancel</DialogButton>
          <DialogButton action='confirm' isDefaultAction>
            {action}
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const BackupList: BackupListType = ({ data }) => {
  return (
    <List twoLine style={{ width: '100%', marginBottom: '1em' }}>
      {data && data.getBackups ? (
        data.getBackups.map(backup => <BackupRow {...backup} key={backup.date.toString()} />)
      ) : (
        <ListItem>Loading</ListItem>
      )}
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
