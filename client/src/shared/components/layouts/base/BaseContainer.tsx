import React, { FC, ReactNode } from 'react';
import Header from 'shared/components/navigation/header';
import { Content, Footer } from 'shared/styles/containers';

interface BaseContainerProps {
  children: ReactNode;
  isHeader?: boolean;
  isFooter?: boolean;
}

const BaseContainer: FC<BaseContainerProps> = ({ isHeader = true, children, isFooter = true }) => {
  return (
    <>
      {isHeader && <Header />}
      <Content>{children}</Content>
      {isFooter && <Footer>Footer</Footer>}
    </>
  );
};

export default BaseContainer;
