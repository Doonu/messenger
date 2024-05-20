import { IDialogChat } from 'shared/models/IDialog';

export interface IChatInfo {
  chat: Partial<IDialogChat | null>;
}

export type stageChatInfo = 'main' | 'addUsers';
