import React, { FC, ReactNode } from 'react';
import Header from '../../navigation/header';
import { Content, Footer } from '../../../shared/styles/containers';

interface BaseContainerProps {
  children: ReactNode;
  isHeader?: boolean;
}

const BaseContainer: FC<BaseContainerProps> = ({ isHeader = true, children }) => {
  return (
    <>
      {isHeader && <Header />}
      <Content>{children}</Content>
      <Footer>Footer</Footer>
    </>
  );
};

export default BaseContainer;
