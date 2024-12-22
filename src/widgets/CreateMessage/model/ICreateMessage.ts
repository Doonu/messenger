import { IMessage } from '@entities/dialogs';

export interface ICreateMessage {
  linkToEditionMessage: () => void;
  deleteEditMessage: () => void;
  editedMessage?: IMessage | null;
  chatId?: number;
}
