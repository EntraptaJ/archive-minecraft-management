// UI/ui/routes/Admin/Backups/BackupDialog/index.tsx
import { useMutation } from '@apollo/react-hooks';
import { CircularProgress } from '@rmwc/circular-progress';
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from '@rmwc/dialog';
import { TextField } from '@rmwc/textfield';
import React, { ChangeEvent, Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import './BackupDialog.css';
import CREATEBACKUPGQL from './createBackup.graphql';

interface Backup {
  name: string;
  date: Date;
}

interface BackupDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  refetch: () => any;
}

type BackupDialogType = FunctionComponent<BackupDialogProps>;

export const BackupDialog: BackupDialogType = ({ refetch, open, setOpen }) => {
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
