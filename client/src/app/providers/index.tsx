import React from 'react';
import { GlobalStyles } from '@shared/styles';
import { Notification } from '@shared/components';

import WithTheme from './WithTheme';
import WithPersist from './WithPersist';
import WithStore from './WithStore';
import Router from '../router';
import WithAntdConfig from './WithAntdConfig';
import WithAuth from './WithAuth';
import WithSocket from './WithSocket';

const Providers = () => {
  return (
    <WithStore>
      <WithPersist>
        <WithTheme>
          <GlobalStyles />
          <WithAntdConfig>
            <WithAuth />
            <Notification />
            <Router />
            <WithSocket />
          </WithAntdConfig>
        </WithTheme>
      </WithPersist>
    </WithStore>
  );
};

export default Providers;
