import React, { FC } from 'react';
import { MainAdvancedProfile } from '@shared/components';
import { BaseContainer } from '@app/layouts';
import { Sidebar } from '@widgets/Sidebar';

import { SAffixContainer, SCenter, SMain } from './allContainer.styled';
import { AllContainerProps } from '../model/allContainer.types';

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
          <SAffixContainer>
            <Sidebar>content</Sidebar>
            <Sidebar>content</Sidebar>
            <Sidebar>content</Sidebar>
          </SAffixContainer>
        )}
        <SCenter $isSticky={$isSticky} $isFooter={isFooter}>
          {children}
        </SCenter>
        {right && (
          <SAffixContainer>
            <Sidebar $right>
              <MainAdvancedProfile />
            </Sidebar>
          </SAffixContainer>
        )}
      </SMain>
    </BaseContainer>
  );
};
