import React, { FC, ReactNode } from 'react';
import BaseContainer from '../../base';
import Sidebar from '../../../navigation/sidebar';
import { SCenter, SMain } from './allContainer.styled';
import MainAdvancedProfile from '../../../custom/profiles/mainAdvanced';

interface AllContainerProps {
  children: ReactNode;
}

const AllContainer: FC<AllContainerProps> = ({ children }) => {
  return (
    <BaseContainer>
      <SMain>
        <Sidebar $width="small">content</Sidebar>
        <SCenter>{children}</SCenter>
        <Sidebar $right>
          <MainAdvancedProfile />
        </Sidebar>
      </SMain>
    </BaseContainer>
  );
};

export default AllContainer;
