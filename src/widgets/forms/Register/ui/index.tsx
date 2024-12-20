import React from 'react';
import { Formik } from 'formik';
import { Form } from 'antd';
import { useAppDispatch } from '@shared/hooks';
import { useNavigate } from 'react-router-dom';
import { BaseInput } from '@shared/components';
import { postRegistration, IRegister } from '@entities/auth';
import { getProfile } from '@entities/profile';

import { RegisterInitialValue } from '../model/register.initialValue';
import { SContainerAuth, SInputForm, STitle, SBaseButton, SLink } from './register.styled';
import { initialValueRegister } from '../lib/register.initialValue';
import { ValidationSchema } from '../model/register.validationSchema';

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formSubmit = (values: RegisterInitialValue) => {
    const dataRegister: IRegister = {
      email: values.email,
      userName: values.userName,
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
      <Formik<RegisterInitialValue>
        validateOnBlur
        validateOnChange={false}
        initialValues={initialValueRegister}
        validationSchema={ValidationSchema}
        onSubmit={formSubmit}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched, handleBlur }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <STitle>Создать учетную запись</STitle>
            <SInputForm
              help={touched.email && errors.email ? errors.email : ''}
              validateStatus={errors.email && touched.email ? 'error' : 'success'}
              valuePropName="email"
              label="Адрес электронной почты"
              name="Адрес электронной почты"
            >
              <BaseInput
                name="email"
                border="none"
                onChange={(e) => setFieldValue('email', e.target.value)}
                value={values.email}
                height="40px"
                onBlur={handleBlur}
              />
            </SInputForm>
            <SInputForm
              help={touched.userName && errors.userName ? errors.userName : ''}
              validateStatus={errors.userName && touched.userName ? 'error' : 'success'}
              valuePropName="userName"
              label="Отображаемое имя"
              name="Отображаемое имя"
            >
              <BaseInput
                name="userName"
                border="none"
                onChange={(e) => setFieldValue('userName', e.target.value)}
                value={values.userName}
                onBlur={handleBlur}
                height="40px"
              />
            </SInputForm>
            <SInputForm
              help={errors.password && touched.password ? errors.password : ''}
              validateStatus={errors.password && touched.password ? 'error' : 'success'}
              valuePropName="password"
              label="Пароль"
              name="Пароль"
            >
              <BaseInput
                border="none"
                name="password"
                type="password"
                onChange={(e) => setFieldValue('password', e.target.value)}
                value={values.password}
                height="40px"
                onBlur={handleBlur}
              />
            </SInputForm>
            <SInputForm
              help={errors.repeatPassword && touched.repeatPassword ? errors.repeatPassword : ''}
              validateStatus={errors.repeatPassword && touched.repeatPassword ? 'error' : 'success'}
              valuePropName="repeatPassword"
              label="Повторите пароль"
              name="Повторите пароль"
            >
              <BaseInput
                border="none"
                name="repeatPassword"
                type="password"
                height="40px"
                onChange={(e) => setFieldValue('repeatPassword', e.target.value)}
                onBlur={handleBlur}
                value={values.repeatPassword}
              />
            </SInputForm>
            <SBaseButton htmlType="submit">Вход</SBaseButton>
            <SLink to="/">Уже зарегестрированы?</SLink>
          </Form>
        )}
      </Formik>
    </SContainerAuth>
  );
};
