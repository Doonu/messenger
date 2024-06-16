import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'app/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { checkAuth } from 'entities/auth/auth.slice';
import { isAuthSelector } from 'entities/auth/auth.selectors';
import { LoaderPage } from 'components/ui/loaders';
import Login from 'pages/public/login';
import { Feed } from 'pages/private/feed';

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
