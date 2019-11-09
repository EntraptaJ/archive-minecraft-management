import { useMutation } from '@apollo/react-hooks';
import { navigate } from '@reach/router';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React from 'react';
import useForm from 'react-hook-form';
import { Layout } from 'ui/Components/Layout';
import { FieldStyle, FormStyle } from 'ui/lib/styles';
import LOGIN_GQL from './REGISTER.graphql';
import './RegisterForm.css';

interface FormData {
  Username: string;
  Password: string;
}

interface RegisterUserResponse {
  id: string;
}

export const RegisterForm = () => {
  const [loginUser] = useMutation<{ registerUser: RegisterUserResponse }, FormData>(LOGIN_GQL, { errorPolicy: 'all' });
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (variables: FormData) => {
    try {
      const response = await loginUser({
        variables,
      });
      if (response && response.data) {
        navigate('/login');
      } else console.error('Token not recieved');
    } catch (e) {}
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} style={FormStyle}>
        <Typography use='headline4'>Register</Typography>

        <TextField outlined label='Username' name='Username' autoComplete='username' style={FieldStyle} inputRef={register} />

        <TextField
          outlined
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
