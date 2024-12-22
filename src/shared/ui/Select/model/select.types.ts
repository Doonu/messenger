import { SelectProps } from 'antd';

export interface ISelect extends SelectProps {
  width?: string;
}

export type ISelectProps = Pick<ISelect, 'width'>;
