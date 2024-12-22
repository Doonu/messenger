import React, { FC } from 'react';

import { ISegment } from '../model/segment.types';
import { SSegmented } from './segment.styles';

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
