import React, { FC } from 'react';
import { FaBoxOpen } from 'react-icons/fa';

import { SEmptyAntd, SMessage } from './empty.styles';
import { IEmpty } from '../model/empty.types';

export const Empty: FC<IEmpty> = ({ message, ...props }) => {
  return (
    <SEmptyAntd
      image={<FaBoxOpen size={80} />}
      description={<SMessage>{message}</SMessage>}
      {...props}
    />
  );
};
