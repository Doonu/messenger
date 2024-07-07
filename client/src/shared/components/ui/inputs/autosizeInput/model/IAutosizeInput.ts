import { TextareaAutosizeProps } from 'react-textarea-autosize';

export interface IAutosizeInputProps extends TextareaAutosizeProps {
  $position: boolean;
  $isDraggable?: boolean;
  minRows: number;
  maxRows?: number;
  isDrag?: boolean;
  $isMaxWidth?: boolean;
}
