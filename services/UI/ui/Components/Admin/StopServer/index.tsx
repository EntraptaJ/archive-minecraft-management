// UI/ui/Components/Admin/RestartServer/index.tsx
import { useMutation } from '@apollo/react-hooks';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from '@rmwc/dialog';
import React, { FunctionComponent, useState } from 'react';
import './StopServer.css';
import STOPGQL from './stopServer.graphql';

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
