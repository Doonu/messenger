import { IChat, IMessageItem } from '@shared/models';
import { MouseEvent, RefObject } from 'react';

export interface IMessage extends IChat {
  handlerChoice: (id: number) => void;
  handlerUpdate: (event: MouseEvent<HTMLDivElement>, id: number) => void;
  choiceMessages: number[];
  isRead: boolean;
  chatRef: RefObject<HTMLDivElement>;
}

export interface IMessageItemProps {
  messageItem: IMessageItem;
  index: number;
  handlerChoice: (id: number) => void;
  handlerUpdate: (event: MouseEvent<HTMLDivElement>, id: number) => void;
  choiceMessages: number[];
  isRead: boolean;
  chatRef: RefObject<HTMLDivElement>;
}
