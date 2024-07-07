import { SegmentedProps } from 'antd';

export type ISegment = Pick<SegmentedProps, 'options' | 'onChange' | 'disabled' | 'value'>;
