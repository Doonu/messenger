import { APINotifyItem, INotifyItem } from '@entities/notification';
import { userConverting } from '@entities/friends';

export const friendRequestConverting = (data: APINotifyItem): INotifyItem => {
  return {
    id: data.id,
    content: data.content,
    createdAt: data.createdAt,
    sender: userConverting(data.sender),
  };
};
