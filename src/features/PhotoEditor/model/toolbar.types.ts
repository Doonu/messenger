import { ComponentType, Dispatch, SetStateAction } from 'react';
import { UploadFile } from 'antd';

export type IActionType = 'burch' | 'resize' | 'text' | null;

export interface IAction {
  type: IActionType;
  Icon: ComponentType;
}

export interface ToolbarTypes {
  tool: IActionType;
  setTool: Dispatch<SetStateAction<IActionType>>;
}

export interface IPhotoEditor {
  image: UploadFile;
  onEditionImage: (file: UploadFile) => void;
  canselEdit: () => void;
}
