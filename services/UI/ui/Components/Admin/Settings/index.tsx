// UI/ui/Components/Admin/Settings/index.tsx
import { useMutation } from '@apollo/react-hooks';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { FieldStyle, FormStyle } from 'ui/lib/styles';
import './Settings.css';
import UPDATESETTINGSGQL from './updateSettings.graphql';

export interface Settings {
  MCURI: string;
  DISCORDAPI?: string;
  DISCORDCHANNEL?: string;
}

interface AdminSettingsProps extends Settings {}

type AdminSettingsType = FunctionComponent<AdminSettingsProps>;

export const AdminSettings: AdminSettingsType = ({ MCURI, DISCORDAPI, DISCORDCHANNEL }) => {
  const [MCURIValue, setMCURIValue] = useState<string>(MCURI);
  const [DISCORDTOKENValue, setDISCORDTOKENValue] = useState<string>(DISCORDAPI ? DISCORDAPI : '');
  const [DISCORDCHANNELValue, setDISCORDCHANNELValue] = useState<string>(DISCORDCHANNEL ? DISCORDCHANNEL : '');
  const [updateSettingsFN] = useMutation<{ updateSettings: Settings }, { CONFIG: Settings }>(UPDATESETTINGSGQL, {
    variables: {
      CONFIG: {
        MCURI: MCURIValue,
        DISCORDAPI: DISCORDTOKENValue.length > 0 ? DISCORDTOKENValue : undefined,
        DISCORDCHANNEL: DISCORDCHANNELValue.length > 0 ? DISCORDCHANNELValue : undefined,
      },
    },
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

      <TextField
        outlined
        style={FieldStyle}
        label='Discord Channe;'
        value={DISCORDCHANNELValue}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setDISCORDCHANNELValue(target.value)}
      />

      <Button style={FieldStyle} raised onClick={updateSettings} label='Save' />
    </div>
  );
};
