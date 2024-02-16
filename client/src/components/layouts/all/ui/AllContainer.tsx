import React, { FC, ReactNode } from 'react';
import BaseContainer from '../../base';
import Sidebar from '../../../navigation/sidebar';
import { SAffixContainer, SCenter, SMain } from './allContainer.styled';
import MainAdvancedProfile from '../../../custom/profiles/mainAdvanced';
import { Affix } from 'antd';

interface AllContainerProps {
  children: ReactNode;
}

const AllContainer: FC<AllContainerProps> = ({ children }) => {
  return (
    <BaseContainer>
      <SMain>
        <Affix offsetTop={30}>
          <SAffixContainer>
            <Sidebar>content</Sidebar>
            <Sidebar>content</Sidebar>
            <Sidebar>content</Sidebar>
          </SAffixContainer>
        </Affix>
        <SCenter>{children}</SCenter>
        <Affix offsetTop={30}>
          <SAffixContainer>
            <Sidebar $right>
              <MainAdvancedProfile />
            </Sidebar>
          </SAffixContainer>
        </Affix>
      </SMain>
    </BaseContainer>
  );
};

export default AllContainer;
