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
