import React, { FC } from 'react';

import { SContainer } from './collapse.styled';
import { ICollapse } from '../model/ICollapse';

export const Collapse: FC<ICollapse> = ({ header, body, isOpen }) => {
  return (
    <SContainer
      activeKey={isOpen ? '1' : '0'}
      items={[
        {
          key: 1,
          label: header,
          children: body,
        },
      ]}
    />
  );
};
