import { IUser } from '@entities/friends';

export interface GenerateChatProps {
  type?: boolean;
  users?: IUser[];
  imgSubstitute?: string;
  dialogName?: string;
}
