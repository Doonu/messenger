import React, { FC } from 'react';
import { SContainer, SContainerIcons } from './toolbar.styled';
import { arrayAction } from './lib/config';
import { IToolbar } from '../../model/IToolbar';

const Toolbar: FC<IToolbar> = ({ setTool, tool }) => {
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

export default Toolbar;
