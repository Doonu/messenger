import { IAutosizeInputProps } from './IAutosizeInput';

export interface IAutosizeInputStyle extends Omit<IAutosizeInputProps, 'isDrag'> {
  $isDrag?: boolean;
}
