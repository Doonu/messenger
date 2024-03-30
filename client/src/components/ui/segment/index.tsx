import React, { FC } from 'react';
import { SegmentedProps } from 'antd';
import { SSegmented } from './segment.styled';

export interface ISegmented
  extends Pick<SegmentedProps, 'options' | 'onChange' | 'disabled' | 'value'> {}

const Segmented: FC<ISegmented> = ({ ...props }) => {
  return (
    <div>
      <SSegmented {...props} />
    </div>
  );
};

export default Segmented;
