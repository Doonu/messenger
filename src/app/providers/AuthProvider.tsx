import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { getProfile } from '@shared/api';
import { isAuthSelector } from '@entities/auth';

const AuthProvider = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(isAuthSelector);

  useEffect(() => {
    if (isAuth) dispatch(getProfile());
  }, [isAuth]);

  return null;
};

export default AuthProvider;
