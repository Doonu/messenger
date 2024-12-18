import React, { FC } from 'react';

import { ISegment } from '../model/ISegment';
import { SSegmented } from './segment.styled';

export const Segment: FC<ISegment> = ({ ...props }) => {
  return (
    <div>
      <SSegmented
        options={props.options}
        onChange={props.onChange}
        disabled={props.disabled}
        value={props.value}
      />
    </div>
  );
};
