import { userConverting } from '../user/user.converting';
import { APIMessage, IMessage } from 'shared/models/IMessage';

export const messageConverting = (data: APIMessage): IMessage => ({
  id: data.id,
  content: data.content,
  dialogId: data.dialogId,
  userId: data.userId,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  author: userConverting(data.author),
  readStatus: data.readStatus,
});
