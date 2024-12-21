import React, { FC } from 'react';

import { arrayAction } from '../../lib/config';
import { SContainer, SContainerIcons } from './toolbar.styles';
import { ToolbarTypes } from '../../model/toolbar.types';

export const Toolbar: FC<ToolbarTypes> = ({ setTool, tool }) => {
  return (
    <SContainer>
      {arrayAction.map(({ Icon, type }) => (
        <SContainerIcons onClick={() => setTool(type)} $isActive={tool === type} key={type}>
          <Icon />
        </SContainerIcons>
      ))}
    </SContainer>
  );
};
