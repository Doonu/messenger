import { INotifyItem } from 'shared/models/INotification';
import { APINotifyItem } from 'shared/models/INotification';
import { userConverting } from 'shared/api/converteitions';

export const friendRequestConverting = (data: APINotifyItem): INotifyItem => {
  return {
    id: data.id,
    content: data.content,
    createdAt: data.createdAt,
    sender: userConverting(data.sender),
  };
};
