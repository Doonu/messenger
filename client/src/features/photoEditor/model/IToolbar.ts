import { ComponentType, Dispatch, SetStateAction } from 'react';

export type IActionType = 'burch' | 'resize' | 'text' | null;

export interface IAction {
  type: IActionType;
  Icon: ComponentType;
}

export interface IToolbar {
  tool: IActionType;
  setTool: Dispatch<SetStateAction<IActionType>>;
}
