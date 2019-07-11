import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { ContainerStyle, FormStyle } from '../lib/styles';
import { LinearProgress } from '@rmwc/linear-progress';
import '@material/linear-progress/dist/mdc.linear-progress.css';

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
  const [status, setStatus] = useState<ProgressStatus>();
  setResFN = state => setStatus(state);

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

      <Link to='/Login'>Login</Link>
      <Button raised label={isInstalled ? 'Launch Game' : 'Install Game'} onClick={onClick} />
    </div>
  );
};
