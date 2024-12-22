import React, { FC } from 'react';

import { SContainer } from './sidebar.styled';
import { SidebarProps } from '../model/ISidebar';

export const Sidebar: FC<SidebarProps> = ({ children, $width = 'middle', ...props }) => {
  return (
    <SContainer {...props} $width={$width}>
      {children}
    </SContainer>
  );
};
