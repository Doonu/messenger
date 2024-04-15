import { IUser } from '../models/IUser';

interface IGenerateChat {
  type?: boolean;
  users?: IUser[];
  imgSubstitute?: string;
  dialogName?: string;
}

export const generateChatInfo = ({ type, users, dialogName, imgSubstitute }: IGenerateChat) => {
  return {
    imgDialog: !type ? users?.[0].avatar : imgSubstitute,
    nameDialog: !type ? users?.[0].name : dialogName,
    statusDialog: !type ? users?.[0].statusConnected : false,
  };
};
