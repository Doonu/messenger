import { array, ArraySchema } from 'yup';
import { APIDialog } from '@shared/models';
import { dialogValidationSchema } from '@shared/util';

export const ValidationSchema: ArraySchema<APIDialog[], object> = array(
  dialogValidationSchema()
).required();
