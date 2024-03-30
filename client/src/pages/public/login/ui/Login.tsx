import React from 'react';
import { SBaseContainer } from './login.styled';
import { LoginForm } from 'widgets/forms/login';

const Login = () => {
  return (
    <SBaseContainer>
      <LoginForm />
    </SBaseContainer>
  );
};

export default Login;
