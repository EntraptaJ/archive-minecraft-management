// UI/ui/Components/Admin/RestartServer/index.tsx
import React, { FunctionComponent, useState } from 'react';
import { Button } from '@rmwc/button';
import { Dialog, DialogTitle, DialogButton, DialogContent, DialogActions } from '@rmwc/dialog';
import '@material/dialog/dist/mdc.dialog.min.css';
import '@material/button/dist/mdc.button.min.css';
import STOPGQL from './stopServer.graphql';
import { useMutation } from '@apollo/react-hooks';
import { CircularProgress } from '@rmwc/circular-progress';

interface StopServerProps {}

type StopServerType = FunctionComponent<StopServerProps>;

export const StopServer: StopServerType = () => {
  const [stopServerFN, { loading }] = useMutation<{ stopServer: boolean }>(STOPGQL);
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <>
      <Button
        style={{ marginTop: '1em', marginRight: '1em' }}
        label='Stop Server'
        danger
        raised
        onClick={() => setDialog(true)}
        icon={loading && <CircularProgress style={{ color: 'white' }} />}
      />

      <Dialog
        open={dialog}
        onClose={async ({ detail }) => {
          if (detail.action === 'confirm') await stopServerFN();
          console.log(detail.action);
          setDialog(false);
        }}
      >
        <DialogTitle>Stop Server</DialogTitle>
        <DialogContent>Are you sure you want to stop the server?</DialogContent>
        <DialogActions>
          <DialogButton action='close'>Cancel</DialogButton>
          <DialogButton action='confirm' isDefaultAction danger>
            Stop Server
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
