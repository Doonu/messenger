import { array, number, object, ObjectSchema, string } from 'yup';
import { userValidationSchema } from '@shared/util';
import { ApiProfile } from '@entities/friends';

export const ValidationSchema: ObjectSchema<ApiProfile> = userValidationSchema().shape({
  roles: array(
    object({
      id: number().required(),
      description: string().required(),
      value: string().required(),
      createdAt: string().required(),
    }).required()
  ).required(),
});
