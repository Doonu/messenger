import { GenerateChatProps } from './generateChatInfo.type';

export const generateChatInfo = ({ type, users, dialogName, imgSubstitute }: GenerateChatProps) => {
  return {
    imgDialog: !type ? users?.[0].avatar : imgSubstitute,
    nameDialog: !type ? users?.[0].name : dialogName,
    statusDialog: !type ? users?.[0].statusConnected : false,
  };
};
