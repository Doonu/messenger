import React, { FC } from 'react';

import { ISegment } from '../model/ISegment';
import { SSegmented } from './segment.styled';

export const Segment: FC<ISegment> = ({ ...props }) => {
  return (
    <div>
      <SSegmented {...props} />
    </div>
  );
};
