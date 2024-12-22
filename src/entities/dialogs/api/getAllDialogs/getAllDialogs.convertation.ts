import { APIDialog, IDialog, messageConverting } from '@entities/dialogs';
import { userArrayConverting } from '@entities/friends';

export const createDialogConvertation = (array: APIDialog[]): IDialog[] =>
  array.map((data) => ({
    id: data.id,
    dialogName: data.dialogName,
    imgSubstitute: data.imgSubstitute,
    participants: userArrayConverting(data.participants),
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
    isGroup: data.isGroup,
    countNotReadMessages: data.countNotReadMessages,
    readStatusLastMessage: data.readStatusLastMessage,
    lastMessage: data.lastMessage && messageConverting(data.lastMessage),
  }));
