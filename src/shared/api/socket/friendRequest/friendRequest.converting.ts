import { INotifyItem, APINotifyItem } from '@shared/models';
import { userConverting } from '@shared/api';

export const friendRequestConverting = (data: APINotifyItem): INotifyItem => {
  return {
    id: data.id,
    content: data.content,
    createdAt: data.createdAt,
    sender: userConverting(data.sender),
  };
};
