import { IMessage } from '@shared/models';

export interface ICreateMessage {
  linkToEditionMessage: () => void;
  deleteEditMessage: () => void;
  editedMessage?: IMessage | null;
  chatId?: number;
}
