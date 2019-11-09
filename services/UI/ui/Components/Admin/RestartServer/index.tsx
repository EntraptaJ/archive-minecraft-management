// UI/ui/Components/Admin/RestartServer/index.tsx
import { useMutation } from '@apollo/react-hooks';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from '@rmwc/dialog';
import React, { FunctionComponent, useState } from 'react';
import { MutationResponse } from 'ui/Components/types';
import './RestartServer.css';
import RESTARTGQL from './restartServer.graphql';

interface RestartServerProps {}

type RestartServerType = FunctionComponent<RestartServerProps>;

interface RestartServerInput {
  skipDelay?: boolean;
}

export const RestartServer: RestartServerType = () => {
  const [restartServerFN, { loading }] = useMutation<{ restartServer: MutationResponse }, { options?: RestartServerInput }>(
    RESTARTGQL,
  );
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <>
      <Button
        style={{ marginTop: '1em' }}
        label='Restart Server'
        danger
        raised
        onClick={() => setDialog(true)}
        icon={loading && <CircularProgress style={{ color: 'white' }} />}
      />

      <Dialog
        open={dialog}
        onClose={async ({ detail }) => {
          if (detail.action === 'confirm') await restartServerFN();
          console.log(detail.action);
          setDialog(false);
        }}
      >
        <DialogTitle>Restart Server</DialogTitle>
        <DialogContent>Are you sure you want to restart server?</DialogContent>
        <DialogActions>
          <DialogButton action='close'>Cancel</DialogButton>
          <DialogButton action='confirm' isDefaultAction danger>
            Restart Server
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
