import { FC, PropsWithChildren } from 'react';
import { darkTheme } from '@shared/styles';
import { ThemeProvider } from 'styled-components';

const WithTheme: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
);

export default WithTheme;
