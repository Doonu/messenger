import React from 'react';
import { Login as LoginForm } from '@widgets/forms';

import { SBaseContainer } from './login.styled';

const Login = () => {
  return (
    <SBaseContainer>
      <LoginForm />
    </SBaseContainer>
  );
};

export default Login;
