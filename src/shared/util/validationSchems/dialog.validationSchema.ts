import { array, boolean, number, object, string } from 'yup';
import { messageValidationSchema, userValidationSchema } from '@shared/util';

export const dialogValidationSchema = () =>
  object().shape({
    id: number().required(),
    imgSubstitute: string().required(),
    dialogName: string().required(),
    participants: array(userValidationSchema()).required(),
    updatedAt: string().required(),
    createdAt: string().required(),
    isGroup: boolean().required(),
    fixedMessage: messageValidationSchema().nullable(),
    countNotReadMessages: number().required(),
    readStatusLastMessage: boolean().required(),
    lastMessage: messageValidationSchema().nullable(),
  });
