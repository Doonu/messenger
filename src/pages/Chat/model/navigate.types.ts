import { IChat, IDialogChat } from '@entities/dialogs';
import { Dispatch, SetStateAction } from 'react';

export interface INavigate {
  choiceMessages: number[];
  onCansel: () => void;
  allMessages: IChat[];
  newMessages: IChat[];
  setInfoPlayers: Dispatch<SetStateAction<boolean>>;
  chat?: IDialogChat | null;
}
