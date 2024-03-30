import { INotifyItem } from '../../../models/INotification';
import { APINotifyItem } from '../../http/notification/getAllNotification';
import { userConverting } from '../../../converteitions';

export const friendRequestConverting = (data: APINotifyItem): INotifyItem => {
  return {
    id: data.id,
    content: data.content,
    createdAt: data.createdAt,
    sender: userConverting(data.sender),
  };
};
