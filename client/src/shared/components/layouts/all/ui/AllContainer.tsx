import React, { FC, ReactNode } from 'react';
import BaseContainer from 'shared/components/layouts/base';
import Sidebar from 'shared/components/navigation/sidebar';
import { SAffixContainer, SCenter, SMain } from './allContainer.styled';
import MainAdvancedProfile from 'shared/components/custom/profiles/mainAdvanced';
import { Affix } from 'antd';

interface AllContainerProps {
  children: ReactNode;
  left?: boolean;
  right?: boolean;
  isFooter?: boolean;
  $isSticky?: boolean;
}

const AllContainer: FC<AllContainerProps> = ({
  children,
  left = true,
  right = true,
  isFooter = true,
  $isSticky = false,
}) => {
  return (
    <BaseContainer isFooter={isFooter}>
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
        <SCenter $isSticky={$isSticky} $isFooter={isFooter}>
          {children}
        </SCenter>
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
