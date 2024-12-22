import React from 'react';
import { Login as LoginForm } from '@widgets/Login';

import { SBaseContainer } from './login.styles';

const Login = () => {
  return (
    <SBaseContainer>
      <LoginForm />
    </SBaseContainer>
  );
};

export default Login;
