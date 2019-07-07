import '@material/button/dist/mdc.button.min.css';
import '@material/floating-label/dist/mdc.floating-label.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/typography/dist/mdc.typography.min.css';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React from 'react';
import useForm from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import LOGIN_GQL from './REGISTER.graphql';
import { navigate } from '@reach/router';
import { FieldStyle, FormStyle } from '~lib/styles';
import { Layout } from '~Components/Layout';

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
