// MC-Launcher/app/renderer/components/LaunchButton/index.tsx
import React, { useState } from 'react';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';
import { IpcMessageEvent } from 'electron';
import '@material/typography/dist/mdc.typography.css';
import '@material/button/dist/mdc.button.css';

// @ts-ignore
const { ipcRenderer } = window.require('electron') as { ipcRenderer: Electron.IpcRenderer };

interface LaunchGameResponse {
  successful: boolean;
}

export const LaunchButton = () => {
  const [res, setRes] = React.useState<boolean>();

  ipcRenderer.on('LaunchGameResponse', (msg: IpcMessageEvent, arg: LaunchGameResponse) => {
    setRes(arg.successful)
    
  });

  const clickButton = async () => {
    ipcRenderer.send('LaunchGame');
  };

  return (
    <>
      <Typography use='body1'>{res ? 'True' : 'False'}</Typography>
      <Button label='Launch Game' onClick={clickButton} />
    </>
  );
};
