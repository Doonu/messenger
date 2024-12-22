import { object, ObjectSchema, string } from 'yup';

import { ILoginState } from './login.type';

export const ValidationSchema: ObjectSchema<ILoginState> = object()
  .shape({
    email: string()
      .required('Пожалуйста введите адрес электронной почты')
      .email('Адрес электронной почты невалидный'),
    password: string()
      .required('Пожалуйста введите пароль')
      .min(4, 'Минимальное кол-во символов: 4')
      .max(16, 'Максимальное кол-во символов: 16'),
  })
  .required();
