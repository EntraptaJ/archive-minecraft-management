// UI/ui/routes/Admin/Backups/index.tsx
import { useMutation, useQuery } from '@apollo/react-hooks';
import '@material/dialog/dist/mdc.dialog.min.css';
import '@material/fab/dist/mdc.fab.css';
import '@material/floating-label/dist/mdc.floating-label.min.css';
import '@material/icon-button/dist/mdc.icon-button.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import '@material/textfield/dist/mdc.textfield.min.css';
import { CircularProgress } from '@rmwc/circular-progress';
import '@rmwc/circular-progress/circular-progress.css';
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from '@rmwc/dialog';
import { Fab } from '@rmwc/fab';
import { IconButton } from '@rmwc/icon-button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { BackupList } from '~Components/Admin/BackupList';
import { Layout } from '~Components/Layout';
import { FormStyle } from '~lib/styles';
import CREATEBACKUPGQL from './createBackup.graphql';
import GETBACKUPSGQL from './getBackups.graphql';

interface Backup {
  name: string;
  date: Date;
}

interface BackupDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  refetch: () => any;
}

type BackupDialogType = FunctionComponent<BackupDialogProps>;

const BackupDialog: BackupDialogType = ({ refetch, open, setOpen }) => {
  const [createBackup, { loading }] = useMutation<{ createBackup: Backup }, { name?: string }>(CREATEBACKUPGQL);
  const [name, setValue] = useState<string>();

  return (
    <Dialog
      open={open}
      onClose={async ({ detail }) => {
        if (detail.action === 'confirm') {
          await createBackup({
            variables: {
              name: name,
            },
          });
          await refetch();
        } else console.log('Canceled');
        setOpen(false);
      }}
    >
      <TextField autoFocus outlined label='HIDDEN' style={{ position: 'fixed', top: '-200vh' }} />
      <DialogTitle>New Backup</DialogTitle>
      <DialogContent style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        Create new Backup
        <div>
          <TextField
            style={{ marginTop: '1em', width: '100%' }}
            label='Backup Name'
            outlined
            value={name}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => setValue(target.value)}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <DialogButton action='close'>Cancel</DialogButton>
        <DialogButton action='confirm' isDefaultAction icon={loading && <CircularProgress />}>
          Create Backup
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
};

interface Backups {
  name: string;
  folderName: string;
  date: Date;
}

const AdminBackupRoute = () => {
  const { data, refetch } = useQuery<{ getBackups: Backups[] }>(GETBACKUPSGQL);

  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <>
      <Layout admin>
        <div style={FormStyle}>
          <div style={{ display: 'flex', width: '100%' }}>
            <Typography
              style={{ alignSelf: 'center', position: 'absolute', left: '49%', transform: 'translateX(-50%)' }}
              use='headline4'
            >
              World Backups
            </Typography>
            <IconButton
              style={{ alignSelf: 'flex-end', marginLeft: 'auto' }}
              icon='settings'
              onClick={() => console.log('Open settings')}
            />
          </div>

          <BackupList data={data} />
          <div style={{ alignSelf: 'flex-end' }}>
            <Fab theme={['primaryBg', 'onPrimary']} icon='add' onClick={() => setDialog(!dialog)} />
          </div>
        </div>
      </Layout>
      <BackupDialog refetch={refetch} open={dialog} setOpen={setDialog} />
    </>
  );
};

export default AdminBackupRoute;
