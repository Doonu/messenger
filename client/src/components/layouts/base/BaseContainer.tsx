import React, { FC, ReactNode } from 'react';
import Header from '../../navigation/header';
import { SContent } from '../../../shared/styles/containers';

interface BaseContainerProps {
  children: ReactNode;
  isHeader?: boolean;
}

const BaseContainer: FC<BaseContainerProps> = ({ isHeader = true, children }) => {
  return (
    <>
      {isHeader && <Header />}
      <SContent>{children}</SContent>
    </>
  );
};

export default BaseContainer;
