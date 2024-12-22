import React, { FC } from 'react';
import { Content, Footer } from '@shared/styles';
import { Header } from '@widgets/Header';

import { IBaseContainerProps } from '../model/baseContainer.types';

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
