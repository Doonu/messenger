import React, { FC, ReactNode } from 'react';
import BaseContainer from 'components/layouts/base';
import Sidebar from 'components/navigation/sidebar';
import { SAffixContainer, SCenter, SMain } from './allContainer.styled';
import MainAdvancedProfile from 'components/custom/profiles/mainAdvanced';
import { Affix } from 'antd';

interface AllContainerProps {
  children: ReactNode;
  left?: boolean;
  right?: boolean;
}

const AllContainer: FC<AllContainerProps> = ({ children, left = true, right = true }) => {
  return (
    <BaseContainer>
      <SMain>
        {left && (
          <Affix offsetTop={30}>
            <SAffixContainer>
              <Sidebar>content</Sidebar>
              <Sidebar>content</Sidebar>
              <Sidebar>content</Sidebar>
            </SAffixContainer>
          </Affix>
        )}
        <SCenter>{children}</SCenter>
        {right && (
          <Affix offsetTop={30}>
            <SAffixContainer>
              <Sidebar $right>
                <MainAdvancedProfile />
              </Sidebar>
            </SAffixContainer>
          </Affix>
        )}
      </SMain>
    </BaseContainer>
  );
};

export default AllContainer;
