import { useMutation } from '@apollo/react-hooks';
import { Button } from '@rmwc/button';
import { Select } from '@rmwc/select';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { ChangeEvent, useState } from 'react';
import useForm from 'react-hook-form';
import { Layout } from 'ui/Components/Layout';
import { MutationResponse } from 'ui/Components/types';
import { FieldStyle, FormStyle } from 'ui/lib/styles';
import './TellRaw.css';
import TELLRAWGQL from './tellRaw.graphql';

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

        <TextField
          outlined
          label='Text'
          name='Username'
          autoComplete='username'
          style={{ ...FieldStyle, marginBottom: '1em' }}
          inputRef={register}
        />

        <Select
          outlined
          label='Color'
          options={[
            { label: 'Black', value: 'black' },
            { label: 'Dark Blue', value: 'dark_blue' },
            { label: 'Dark Green', value: 'dark_green' },
            { label: 'Dark Aqua', value: 'dark_aqua' },
            { label: 'Red', value: 'red' },
          ]}
          value={color}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => target.value}
        />

        <Button raised label='Submit' style={{ ...FieldStyle, marginTop: '1em' }} type='submit' />
      </form>
    </Layout>
  );
};
