import React, { FC } from 'react';
import { Header } from '@shared/components';
import { Content, Footer } from '@shared/styles';

import { IBaseContainerProps } from '../model/IBaseContainer';

export const BaseContainer: FC<IBaseContainerProps> = ({
  isHeader = true,
  children,
  isFooter = true,
}) => {
  return (
    <>
      {isHeader && <Header />}
      <Content>{children}</Content>
      {isFooter && <Footer>Footer</Footer>}
    </>
  );
};
