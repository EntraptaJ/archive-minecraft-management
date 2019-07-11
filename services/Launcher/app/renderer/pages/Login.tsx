// MC-Launcher/app/renderer/pages/login.tsx
import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/typography/dist/mdc.typography.css';
import { RouteComponentProps } from '@reach/router';
import { MainStyle, FormStyle, FieldStyle } from '../lib/styles';
import { Button } from '@rmwc/button';

// @ts-ignore
const { ipcRenderer } = window.require('electron') as { ipcRenderer: Electron.IpcRenderer };

interface LoginPageProps extends RouteComponentProps {}

type LoginPageType = FunctionComponent<LoginPageProps>;

export const LoginPage: LoginPageType = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  ipcRenderer.on('newSession', (a, { successful }) => console.log(successful));

  const onClick = async () => {
    ipcRenderer.send('loginUser', { username, password });
  };

  return (
    <div style={MainStyle}>
      <div style={FormStyle}>
        <Typography use='headline4'>Login</Typography>

        <TextField
          outlined
          style={FieldStyle}
          label='Username'
          value={username}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => setUsername(target.value)}
        />

        <TextField
          outlined
          style={FieldStyle}
          label='Password'
          value={password}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => setPassword(target.value)}
        />

        <Button style={FieldStyle} raised onClick={onClick} label='Login' />
      </div>
    </div>
  );
};
