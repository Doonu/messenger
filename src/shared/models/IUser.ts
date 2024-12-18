export interface IUser {
  name: string;
  id: number;
  email: string;
  banned: boolean;
  banReason: null | string;
  statusConnected: boolean;
  timeConnected: string;
  roles: {
    value: string;
    createdAt: string;
  }[];
  avatar: string;
  friends: number[];
}

export interface ApiProfile {
  name: string;
  email: string;
  banned: boolean;
  banReason: null | string;
  id: number;
  statusConnected: boolean;
  timeConnected: string;
  roles: {
    id: number;
    value: string;
    description: string;
    createdAt: string;
  }[];
  imgSubstitute: string;
  friends: number[];
}

export interface IGetFriendRequest {
  status: string | boolean;
  reqId?: number;
}

export interface ApiGetUsersExceptFriends {
  user: ApiProfile;
  isSendFriend: boolean;
}

export interface IUserExcept extends IUser {
  isSendFriend?: boolean;
}
