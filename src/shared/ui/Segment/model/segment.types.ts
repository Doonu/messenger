import { SegmentedProps } from 'antd';

// TODO: изменить
export type ISegment = Required<Pick<SegmentedProps<any>, 'options' | 'onChange' | 'value'>> &
  Partial<Pick<SegmentedProps, 'disabled'>>;
