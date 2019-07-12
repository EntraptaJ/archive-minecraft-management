// MC-Launcher/app/renderer/pages/Settings.tsx
import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/floating-label/dist/mdc.floating-label.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';
import '@material/typography/dist/mdc.typography.min.css';
import '@material/slider/dist/mdc.slider.min.css';
import { RouteComponentProps, globalHistory } from '@reach/router';
import { MainStyle, FormStyle, FieldStyle } from '../lib/styles';
import { Button } from '@rmwc/button';
import { Slider } from '@rmwc/slider';

interface AppConfig {
  /**
   * The MC Management Server URL
   */
  serverURL: string
  ramAllocation: number
}


// @ts-ignore
const { ipcRenderer } = window.require('electron') as { ipcRenderer: Electron.IpcRenderer };

interface SettingsPageProps extends RouteComponentProps {}

type SettingsPageType = FunctionComponent<SettingsPageProps>;

export const SettingsPage: SettingsPageType = () => {
  const config = ipcRenderer.sendSync('getConfig') as AppConfig
  const [serverURL, setServerURL] = useState<string>(config.serverURL);
  const [ramAllocation, setRAMAllocation] = useState<number>(config.ramAllocation);

  const onClick = async () => {
    console.log(`Save Config\nserverURL: ${serverURL}\nramAllocation: ${ramAllocation}`)
    ipcRenderer.send('saveConfig', { serverURL, ramAllocation });
    // globalHistory.navigate('/');
  };

  return (
    <div style={MainStyle}>
      <div style={FormStyle}>
        <Typography use='headline4'>Application Settings</Typography>

        <TextField
          outlined
          style={FieldStyle}
          label='Server URL'
          value={serverURL}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => setServerURL(target.value)}
        />

        <Typography
          className='live-preview-labe'
          style={{ marginTop: '1em', opacity: 0.5, marginBottom: '.25rem' }}
          use='caption'
        >
          RAM Allocation (Gigabytes)
        </Typography>
        <Slider
          value={ramAllocation}
          onChange={evt => setRAMAllocation(evt.detail.value)}
          onInput={evt => setRAMAllocation(evt.detail.value)}
          discrete
          displayMarkers
          min={1}
          max={8}
          step={1}
        />

        <Button style={FieldStyle} raised onClick={onClick} label='Save Settings' />
      </div>
    </div>
  );
};
