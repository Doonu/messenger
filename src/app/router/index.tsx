import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@shared/hooks';
import { accessTokenSelector } from '@entities/auth';
import { LoaderPage } from '@shared/ui';
import Login from '@pages/login';
import Feed from '@pages/Feed';

import { privateRoutes, publicRoutes } from '../routes';

const Router = () => {
  const isAuth = useAppSelector(accessTokenSelector);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoaderPage />}>
        <Routes>
          {isAuth &&
            privateRoutes.map((route) => (
              <React.Fragment key={route.path}>
                <Route path={route.path} element={<route.component />} />
                {route.path && <Route path="/*" element={<Feed />} />}
              </React.Fragment>
            ))}

          {!isAuth &&
            publicRoutes.map((route) => (
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
