import { ObjectSchema } from 'yup';
import { APIDialog } from '@shared/models';
import { dialogValidationSchema } from '@shared/util';

export const ValidationSchema: ObjectSchema<APIDialog> = dialogValidationSchema();
