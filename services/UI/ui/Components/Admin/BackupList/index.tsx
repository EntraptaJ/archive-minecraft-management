// UI/ui/Components/Admin/BackupList/index.tsx
import { useMutation } from '@apollo/react-hooks';
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from '@rmwc/dialog';
import { List, ListItem, ListItemMeta, ListItemPrimaryText, ListItemSecondaryText, ListItemText } from '@rmwc/list';
import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';
import moment from 'moment';
import React, { FunctionComponent, useState } from 'react';
import './BackupList.css';
import RESTOREBACKUPGQL from './restoreBackup.graphql';

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
