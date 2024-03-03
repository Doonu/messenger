export interface IUser {
  name: string;
  id: number;
  email: string;
  banned: boolean;
  banReason: null | string;
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
  roles: {
    id: number;
    value: string;
    description: string;
    createdAt: string;
  }[];
  imgSubstitute: string;
  friends: number[];
}
