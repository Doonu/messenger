import React from 'react';
import { Formik } from 'formik';
import { Form } from 'antd';
import { SContainerAuth, SInputForm, STitle, SBaseButton, SLink } from './register.styled';
import { IRegister } from 'shared/api/http/auth/postRegistration/postRegistration.type';
import { useAppDispatch } from 'hooks/redux';
import { useNavigate } from 'react-router-dom';
import { postRegistration, getProfile } from 'shared/api';
import { IInitialValue } from '../model/IInitialValueRegister';
import Input from 'shared/components/ui/inputs/baseInput';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValue: IInitialValue = {
    email: '',
    password: '',
    name: '',
    repeatPassword: '',
  };

  const formSubmit = (values: IInitialValue) => {
    const dataRegister: IRegister = {
      email: values.email,
      name: values.name,
      password: values.password,
    };

    dispatch(postRegistration(dataRegister))
      .unwrap()
      .then(() => {
        navigate('/');
        dispatch(getProfile())
          .unwrap()
          .then((fetchedProfile) => console.log(fetchedProfile))
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <SContainerAuth>
      <Formik initialValues={initialValue} onSubmit={formSubmit}>
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <STitle>Создать учетную запись</STitle>
            <SInputForm
              help={errors.email}
              label="Адрес электронной почты"
              name="Адрес электронной почты"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите адрес электронной почты',
                  whitespace: false,
                },
                {
                  type: 'email',
                  message: 'Адрес электронной почты невалидный',
                  whitespace: false,
                },
              ]}
            >
              <Input
                border="none"
                name="email"
                onChange={(e) => setFieldValue('email', e.target.value)}
                value={values.email}
                height="40px"
              />
            </SInputForm>
            <SInputForm
              help={errors.name}
              label="Отображаемое имя"
              name="Отображаемое имя"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите имя',
                  whitespace: false,
                },
                { min: 3, message: 'Минимальное кол-во символов: 3', whitespace: false },
              ]}
            >
              <Input
                border="none"
                name="name"
                onChange={(e) => setFieldValue('name', e.target.value)}
                value={values.name}
                height="40px"
              ></Input>
            </SInputForm>
            <SInputForm
              help={errors.password}
              label="Пароль"
              name="Пароль"
              rules={[
                { required: true, message: 'Пожалуйста введите пароль', whitespace: false },
                { min: 4, message: 'Минимальное кол-во символов: 4', whitespace: false },
                { max: 16, message: 'Максимальное кол-во символов: 16', whitespace: false },
              ]}
            >
              <Input
                border="none"
                name="password"
                type="password"
                onChange={(e) => setFieldValue('password', e.target.value)}
                value={values.password}
                height="40px"
              ></Input>
            </SInputForm>
            <SInputForm
              help={errors.repeatPassword}
              label="Повторите пароль"
              name="Повторите пароль"
              rules={[
                {
                  validator: (_, value) => {
                    return new Promise((resolve: any, reject) => {
                      value === values.password ? resolve() : reject();
                    });
                  },
                  message: 'Пароли не совпадают',
                  whitespace: true,
                },
                { required: true, message: 'Пожалуйста введите пароль', whitespace: true },
                { min: 4, message: 'Минимальное кол-во символов: 4', whitespace: true },
                { max: 16, message: 'Максимальное кол-во символов: 16', whitespace: true },
              ]}
            >
              <Input
                border="none"
                name="repeatPassword"
                type="password"
                height="40px"
                onChange={(e) => setFieldValue('repeatPassword', e.target.value)}
                value={values.repeatPassword}
              ></Input>
            </SInputForm>
            <SBaseButton htmlType="submit">Вход</SBaseButton>
            <SLink to={'/'}>Уже зарегестрированы?</SLink>
          </Form>
        )}
      </Formik>
    </SContainerAuth>
  );
};

export default Register;
