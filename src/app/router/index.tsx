import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { checkAuth, isAuthSelector } from '@entities/auth';
import { LoaderPage } from '@shared/components';
import { Login } from '@pages/public';
import { Feed } from '@pages/private';

import { privateRoutes, publicRoutes } from '../routes';

const Router = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);

  useEffect(() => {
    dispatch(checkAuth());
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Suspense fallback={LoaderPage()}>
        <Routes>
          {isAuth
            ? privateRoutes.map((route) => (
                <React.Fragment key={route.path}>
                  <Route path={route.path} element={<route.component />} />
                  {route.path && <Route path="/*" element={<Feed />} />}
                </React.Fragment>
              ))
            : publicRoutes.map((route) => (
                <React.Fragment key={route.path}>
                  <Route path={route.path} element={<route.component />} />
                  {route.path && <Route path="/*" element={<Login />} />}
                </React.Fragment>
              ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
