// Launcher/app/renderer/pages/Home.tsx
import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { FormStyle } from '../lib/styles';
import { LinearProgress } from '@rmwc/linear-progress';
import '@material/linear-progress/dist/mdc.linear-progress.css';
import { navigate } from '../router';

// @ts-ignore
const { ipcRenderer } = window.require('electron') as { ipcRenderer: Electron.IpcRenderer };

interface RootAppProps extends RouteComponentProps {}

type RootAppType = FunctionComponent<RootAppProps>;

interface ProgressStatus {
  stage: string;
  progress: number;
}

let setResFN: (state: ProgressStatus) => void;

ipcRenderer.on('statusUpdate', (event, message: ProgressStatus) => setResFN(message));

export const RootApp: RootAppType = () => {
  const [isInstalled, setIsInstalled] = useState<boolean>(ipcRenderer.sendSync('checkInstall'));
  const [isAuthed, setIsAuthed] = useState<boolean>(ipcRenderer.sendSync('checkAuth'));
  const [status, setStatus] = useState<ProgressStatus>();
  setResFN = state => setStatus(state);

  ipcRenderer.on('loginUserResponse', () => setIsAuthed(ipcRenderer.sendSync('checkAuth')))

  useEffect(() => setIsAuthed(ipcRenderer.sendSync('checkAuth')), [])

  const onClick = async () => {
    if (isInstalled) ipcRenderer.send('launchGame');
    else ipcRenderer.send('launchGame');
  };

  return (
    <div style={FormStyle}>
      <Typography use='headline4'>Minecraft Launcher</Typography>
      {status && (
        <>
          {' '}
          <Typography use='subtitle1'>{status.stage}</Typography>
          <LinearProgress progress={status.progress} />
        </>
      )}

      {isAuthed ? (
        <Button style={{ marginTop: '1em' }} raised label={isInstalled ? 'Launch Game' : 'Install Game'} onClick={onClick} />
      ) : (
        <Button style={{ marginTop: '1em' }} raised label='Login' onClick={() => navigate('/Login')} />
      )}
    </div>
  );
};
