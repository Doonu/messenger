import { userConverting } from '@shared/api';
import { APINotifyItem, INotifyItem } from '@entities/notification';

export const friendRequestConverting = (data: APINotifyItem): INotifyItem => {
  return {
    id: data.id,
    content: data.content,
    createdAt: data.createdAt,
    sender: userConverting(data.sender),
  };
};
