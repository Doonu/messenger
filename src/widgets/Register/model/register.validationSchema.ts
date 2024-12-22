import { object, ObjectSchema, string } from 'yup';

import { RegisterInitialValue } from './register.initialValue';

export const ValidationSchema: ObjectSchema<RegisterInitialValue> = object().shape({
  email: string()
    .required('Пожалуйста введите адрес электронной почты')
    .email('Адрес электронной почты невалидный'),
  userName: string().required('Пожалуйста введите имя').min(4, 'Минимальное кол-во символов: 4'),
  password: string()
    .required('Пожалуйста введите пароль')
    .min(4, 'Минимальное кол-во символов: 4')
    .max(16, 'Максимальное кол-во символов: 16'),
  repeatPassword: string()
    .required('Пожалуйста введите пароль')
    .min(4, 'Минимальное кол-во символов: 4')
    .max(16, 'Максимальное кол-во символов: 16')
    .test({
      test: (value, context) => {
        if (context.parent.password !== value) {
          return context.createError({
            message: 'Пароли не совпадают',
            path: 'repeatPassword',
          });
        }

        return true;
      },
    }),
});
