import { ComponentType, Dispatch, SetStateAction } from 'react';
import { IFilesPost } from '@shared/models';

export type IActionType = 'burch' | 'resize' | 'text' | null;

export interface IAction {
  type: IActionType;
  Icon: ComponentType;
}

export interface IToolbar {
  tool: IActionType;
  setTool: Dispatch<SetStateAction<IActionType>>;
}

export interface IPhotoEditor {
  image: IFilesPost;
  onEditionImage: (url: any, id: string) => void;
  canselEdit: () => void;
}
