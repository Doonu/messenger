import { ObjectSchema } from 'yup';
import { ApiProfile } from '@shared/models';
import { userValidationSchema } from '@shared/util';

export const ValidationSchema: ObjectSchema<ApiProfile> = userValidationSchema();
