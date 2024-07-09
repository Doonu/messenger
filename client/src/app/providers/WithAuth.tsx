import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { getProfile } from '@shared/api';
import { accessTokenSelector } from '@entities/auth';

const WithAuth = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(accessTokenSelector);

  useEffect(() => {
    if (isAuth) dispatch(getProfile());
  }, [isAuth]);

  return null;
};

export default WithAuth;
