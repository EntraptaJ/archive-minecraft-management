import '@material/button/dist/mdc.button.min.css';
import '@material/floating-label/dist/mdc.floating-label.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/typography/dist/mdc.typography.min.css';
import { Button } from '@rmwc/button';
import { TextField, TextFieldHelperText } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useForm from 'react-hook-form';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import LOGIN_GQL from './LOGIN.graphql';
import { MutationResponse } from '~Components/types';
import { FieldStyle, FormStyle } from '~lib/styles';
import { Layout } from '~Components/Layout';

interface FormData {
  Username: string;
  Password: string;
}

interface LoginUserResponse extends MutationResponse {
  token: string;
}

const AuthError = `GraphQL error: Access denied! You don't have permission for this action!`;

export const LoginForm = () => {
  const [loginUser, { error }] = useMutation<{ loginUser: LoginUserResponse }, FormData>(LOGIN_GQL, { errorPolicy: 'all' });
  const { register, handleSubmit } = useForm<FormData>();
  const [invalid, setInvalid] = useState<
    { field: 'Username' | 'Password'; message: string } | { field: undefined; message: undefined }
  >({ field: undefined, message: undefined });
  const client = useApolloClient();

  const onSubmit = async (variables: FormData) => {
    try {
      const response = await loginUser({
        variables,
      });
      if (response && response.data) {
        if (response.data.loginUser.sucess === false) console.log(response);
        else {
          Cookies.set('token', response.data.loginUser.token, { expires: 30 });
          await client.clearStore()
          await client.resetStore();
          window.location.href = '/'
        }
      } else console.error('Token not recieved');
    } catch (e) {}
  };

  useEffect(
    () => {
      if (typeof error !== 'undefined') {
        if (error.message === AuthError) setInvalid({ field: 'Password', message: 'Password is Invalid' });
        else if (error.graphQLErrors[0].extensions && error.graphQLErrors[0].extensions.code === 'INVALID_USER')
          setInvalid({ field: 'Username', message: 'Username is invalid' });
      }
    },
    [error],
  );

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} style={FormStyle}>
        <Typography use='headline4'>Login</Typography>

        {invalid.field && (
          <TextFieldHelperText persistent validationMsg style={{ color: 'var(--mdc-theme-error, #b00020)' }}>
            {invalid.message}
          </TextFieldHelperText>
        )}

        <TextField
          outlined
          invalid={invalid.field === 'Username'}
          label='Username'
          name='Username'
          autoComplete='username'
          style={FieldStyle}
          inputRef={register}
        />

        <TextField
          outlined
          invalid={invalid.field === 'Password'}
          label='Password'
          name='Password'
          type='password'
          autoComplete='current-password'
          style={FieldStyle}
          inputRef={register}
        />

        <Button raised label='Submit' style={FieldStyle} type='submit' />
      </form>
    </Layout>
  );
};
