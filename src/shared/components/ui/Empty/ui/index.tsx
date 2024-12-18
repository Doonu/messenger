import React, { FC } from 'react';
import { FaBoxOpen } from 'react-icons/fa';

import { SEmptyAntd, SMessage } from './empty.styled';
import { IEmpty } from '../model/IEmpty';

export const Empty: FC<IEmpty> = ({ message, ...props }) => {
  return (
    <SEmptyAntd
      image={<FaBoxOpen size={80} />}
      description={<SMessage>{message}</SMessage>}
      {...props}
    />
  );
};
