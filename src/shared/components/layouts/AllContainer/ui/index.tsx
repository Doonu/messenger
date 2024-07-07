import React, { FC } from 'react';
import { BaseContainer, Sidebar, MainAdvancedProfile } from '@shared/components';
import { Affix } from 'antd';

import { SAffixContainer, SCenter, SMain } from './allContainer.styled';
import { AllContainerProps } from '../model/IAllContainer';

export const AllContainer: FC<AllContainerProps> = ({
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
