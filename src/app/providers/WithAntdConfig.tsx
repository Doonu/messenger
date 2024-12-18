import React, { FC, PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import { antdTheme } from '@shared/styles';

const WithAntdConfig: FC<PropsWithChildren> = ({ children }) => {
  // TODO: Доделать
  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
};

export default WithAntdConfig;
