// UI/ui/Components/Admin/Settings/index.tsx
import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import UPDATESETTINGSGQL from './updateSettings.graphql';
import { useMutation } from '@apollo/react-hooks';
import { FormStyle, FieldStyle } from '~lib/styles';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import '@material/button/dist/mdc.button.min.css';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/floating-label/dist/mdc.floating-label.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';

export interface Settings {
  MCURI: string;
  DISCORDAPI?: string;
}

interface AdminSettingsProps extends Settings {}

type AdminSettingsType = FunctionComponent<AdminSettingsProps>;

export const AdminSettings: AdminSettingsType = ({ MCURI, DISCORDAPI }) => {
  const [MCURIValue, setMCURIValue] = useState<string>(MCURI);
  const [DISCORDTOKENValue, setDISCORDTOKENValue] = useState<string>(DISCORDAPI ? DISCORDAPI : '');
  const [updateSettingsFN] = useMutation<{ updateSettings: Settings }, { CONFIG: Settings }>(UPDATESETTINGSGQL, {
    variables: { CONFIG: { MCURI: MCURIValue, DISCORDAPI: DISCORDTOKENValue.length > 0 ? DISCORDTOKENValue : undefined  } },
  });

  const updateSettings = async () => {
    await updateSettingsFN();
  };

  return (
    <div style={FormStyle}>
      <Typography use='headline4'>Application Settings</Typography>

      <TextField
        outlined
        style={FieldStyle}
        label='MC URL'
        value={MCURIValue}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setMCURIValue(target.value)}
      />

      <TextField
        outlined
        style={FieldStyle}
        label='Discord Token'
        value={DISCORDTOKENValue}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setDISCORDTOKENValue(target.value)}
      />

      <Button style={FieldStyle} raised onClick={updateSettings} label='Save' />
    </div>
  );
};
