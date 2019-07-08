import '@material/button/dist/mdc.button.min.css';
import '@material/floating-label/dist/mdc.floating-label.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/typography/dist/mdc.typography.min.css';
import '@material/select/dist/mdc.select.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import { Button } from '@rmwc/button';
import { TextField, TextFieldHelperText } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { useEffect, useState, ChangeEvent } from 'react';
import useForm from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import TELLRAWGQL from './tellRaw.graphql';
import { MutationResponse } from '~Components/types';
import { FieldStyle, FormStyle } from '~lib/styles';
import { Layout } from '~Components/Layout';
import { Select } from '@rmwc/select';



interface FormData {
  Username: string;
  Password: string;
}

interface LoginUserResponse extends MutationResponse {
  token: string;
}

export const TellRawForm = () => {
  const [tellRaw] = useMutation<{ loginUser: LoginUserResponse }, FormData>(TELLRAWGQL);
  const [color, setColor] = useState<string>();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (variables: FormData) => {
    await tellRaw({
      variables,
    });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} style={FormStyle}>
        <Typography use='headline4'>Tell Raw</Typography>

        <TextField outlined label='Text' name='Username' autoComplete='username' style={{ ...FieldStyle, marginBottom: '1em' }} inputRef={register} />

        <Select
          outlined
          label='Color'
          options={[
            { label: 'Black', value: 'black' },
            { label: 'Dark Blue', value: 'dark_blue' },
            { label: 'Dark Green', value: 'dark_green' },
            { label: 'Dark Aqua', value: 'dark_aqua'},
            { label: 'Red', value: 'red'}
          ]}
          value={color}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => target.value}
        />

        <Button raised label='Submit' style={{ ...FieldStyle, marginTop: '1em' }} type='submit' />
      </form>
    </Layout>
  );
};
