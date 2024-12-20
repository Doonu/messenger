import { IDialogChat } from '@entities/dialogs';

export interface IChatInfo {
  chat: Partial<IDialogChat | null>;
}

export type StageChatInfo = 'main' | 'addUsers';

export interface IMainStage extends IChatInfo {
  switchStage: (stage: StageChatInfo) => void;
}
