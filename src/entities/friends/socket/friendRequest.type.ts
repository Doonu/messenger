import { APINotifyItem } from '@entities/notification';

export interface IHandlerFriendRequestWS {
  to: number;
  from: number;
}

export interface IBaseFriendReq {
  idFriendRequest?: number;
}

export interface IUseFriendRequest {
  newFriendReqCallback?: (data: IResponseNotification) => void;
  acceptedRequestCallback?: () => void;
  canselFriendRequestCallback?: () => void;
  canselRequestCallback?: () => void;
}

export interface IResponseNotification {
  message: string;
  notification: APINotifyItem;
}
