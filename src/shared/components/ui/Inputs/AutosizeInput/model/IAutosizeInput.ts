import { InputProps } from 'antd/es/input/Input';

export interface IAutosizeInputProps extends InputProps {
  $position: boolean;
  $isDraggable?: boolean;
  minRows: number;
  maxRows?: number;
  isDrag?: boolean;
  $isMaxWidth?: boolean;
}
