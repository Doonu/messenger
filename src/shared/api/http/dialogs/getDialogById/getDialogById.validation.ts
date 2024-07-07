import { array, boolean, number, object, ObjectSchema, string } from 'yup';
import { APIDialogChat } from '@shared/models';
import { messageValidationSchema, userValidationSchema } from '@shared/util';

export const ValidationSchema: ObjectSchema<APIDialogChat> = object().shape({
  id: number().required(),
  imgSubstitute: string().required(),
  dialogName: string().required(),
  participants: array(userValidationSchema()).required(),
  updatedAt: string().required(),
  createdAt: string().required(),
  isGroup: boolean().required(),
  fixedMessage: messageValidationSchema().nullable(),
  countNotReadMessages: number().required(),
});
