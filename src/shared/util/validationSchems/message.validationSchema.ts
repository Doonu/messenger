import { array, boolean, number, object, string } from 'yup';
import { userValidationSchema } from '@shared/util';

export const messageValidationSchema = () =>
  object()
    .shape({
      id: number().required(),
      content: array(string().required()).required(),
      dialogId: number().required(),
      userId: number().required(),
      createdAt: string().required(),
      updatedAt: string().required(),
      author: userValidationSchema().required(),
      readStatus: boolean().required(),
      status: string<'main' | 'info'>().required(),
    })
    .required();
