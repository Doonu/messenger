import React, { FC, ReactNode } from 'react';
import { SContainer } from './collapse.styled';

interface ICollapse {
  header: ReactNode;
  body: ReactNode;
  isOpen: boolean;
}

const Collapse: FC<ICollapse> = ({ header, body, isOpen }) => {
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

export default Collapse;
