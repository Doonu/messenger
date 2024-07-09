import axios from 'axios';
import { store } from '@app/store';
import { FC, PropsWithChildren } from 'react';

const WithInterceptor: FC<PropsWithChildren> = ({ children }) => {
  const setupInterceptors = () => {
    axios.interceptors.request.use(
      (config) => {
        const state = store.getState();
        console.log('Current state:', state);
        const sessionToken = state.session.accessToken;

        if (sessionToken) {
          config.headers.Authorization = `Bearer ${sessionToken}`;
        } else {
          console.warn('No token found in state');
        }

        return config;
      },
      (error) => {
        console.error('Interceptor error:', error);
        return Promise.reject(error);
      }
    );
  };

  setupInterceptors();

  return <>{children}</>;
};

export default WithInterceptor;
