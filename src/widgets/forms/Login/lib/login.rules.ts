import { FormItemProps } from 'antd';

export const addressRules: FormItemProps['rules'] = [
  {
    required: true,
    message: 'Пожалуйста введите адрес электронной почты',
    whitespace: true,
  },
  {
    type: 'email',
    message: 'Адрес электронной почты невалидный',
    whitespace: false,
  },
];

export const passwordRules: FormItemProps['rules'] = [
  { required: true, message: 'Пожалуйста введите пароль', whitespace: false },
  { min: 4, message: 'Минимальное кол-во символов: 4', whitespace: false },
  { max: 16, message: 'Максимальное кол-во символов: 16', whitespace: false },
];
