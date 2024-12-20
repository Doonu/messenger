import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { accessTokenSelector } from '@entities/auth';
import { getProfile } from '@entities/profile';

const WithAuth = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(accessTokenSelector);

  useEffect(() => {
    if (isAuth) dispatch(getProfile());
  }, [isAuth]);

  return null;
};

export default WithAuth;
