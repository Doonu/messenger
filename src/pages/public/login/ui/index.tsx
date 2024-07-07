import React from 'react';
import { Login as LoginForm } from '@widgets/forms';

import { SBaseContainer } from './login.styled';

export const Login = () => {
  return (
    <SBaseContainer>
      <LoginForm />
    </SBaseContainer>
  );
};
