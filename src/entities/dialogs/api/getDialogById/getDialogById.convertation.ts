import { messageConverting, userArrayConverting } from '@shared/api';
import { APIDialogChat, IDialogChat } from '@entities/dialogs';

export const getDialogByIdConvertation = (data: APIDialogChat): IDialogChat => ({
  id: data.id,
  dialogName: data.dialogName,
  imgSubstitute: data.imgSubstitute,
  participants: userArrayConverting(data.participants),
  updatedAt: data.updatedAt,
  createdAt: data.createdAt,
  isGroup: data.isGroup,
  fixedMessage: data.fixedMessage && messageConverting(data.fixedMessage),
  countNotReadMessages: data.countNotReadMessages,
});
