import { IUser } from '@shared/models';

export interface GenerateChatProps {
  type?: boolean;
  users?: IUser[];
  imgSubstitute?: string;
  dialogName?: string;
}
