import React from 'react';
import { setupStore } from '@app/store';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles } from '@shared/styles';
import { Provider } from 'react-redux';
import { Notification } from '@shared/components';

import Router from '../router';
import AntdConfigProvider from './AntdConfigProvider';
import AuthProvider from './AuthProvider';
import SocketProviders from './SocketProviders';

const Providers = () => {
  const store = setupStore();

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <AntdConfigProvider>
        <Provider store={store}>
          <AuthProvider />
          <Notification />
          <Router />
          <SocketProviders />
        </Provider>
      </AntdConfigProvider>
    </ThemeProvider>
  );
};

export default Providers;
