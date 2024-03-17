import { INotifyItem } from '../../../../entities/notification/model/INotification';
import { APINotifyItem } from '../../http/notification/getAllNotification';

export const friendRequestConverting = (data: APINotifyItem): INotifyItem => {
  return {
    id: data.id,
    content: data.content,
    createdAt: data.createdAt,
    sender: {
      name: data.sender.name,
      email: data.sender.email,
      banned: data.sender.banned,
      id: data.sender.id,
      banReason: data.sender.banReason,
      avatar: data.sender.imgSubstitute || 'тут будет картинка',
      friends: data.sender.friends,
      statusConnected: data.sender.statusConnected,
      timeConnected: data.sender.timeConnected,
    },
  };
};
