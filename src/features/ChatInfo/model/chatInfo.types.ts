import { IDialogChat } from '@entities/dialogs';
import { Dispatch, SetStateAction } from 'react';
import { IUser } from '@entities/friends';

export interface ChatInfoTypes {
  chat: Partial<IDialogChat | null>;
}

export type StageChatInfo = 'main' | 'addUsers';

export interface IMainStage extends ChatInfoTypes {
  switchStage: (stage: StageChatInfo) => void;
}

export interface INavigate {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  participants?: IUser[];
}
