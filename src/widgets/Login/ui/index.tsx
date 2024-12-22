import React from 'react';
import { Formik } from 'formik';
import { useAppDispatch } from '@shared/hooks';
import { SocketApi } from '@shared/api';
import { ContainerAuth } from '@shared/styles';
import { auth } from '@shared/strings';
import { Logo } from '@shared/components';
import { Form } from 'antd';
import { postLogin } from '@entities/auth';
import { getProfile } from '@entities/profile';
import { BaseInput } from '@shared/ui';

import { ValidationSchema } from '../model/login.validationSchema';
import {
  SBaseButton,
  SFormContainer,
  SInputForm,
  SLink,
  SLinkWrap,
  SSubTitle,
  SForm,
  SLogoContainer,
  STitle,
} from './login.styled';
import { ILoginState } from '../model/login.type';
import { initialValue } from '../lib/login.initialValue';

export const Login = () => {
  const dispatch = useAppDispatch();

  const formSubmit = (values: ILoginState) => {
    dispatch(postLogin(values))
      .unwrap()
      .then(() => {
        dispatch(getProfile())
          .unwrap()
          .then(() => {
            SocketApi.socket?.connect();
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <ContainerAuth>
      <Formik<ILoginState>
        initialValues={initialValue}
        validationSchema={ValidationSchema}
        validateOnBlur
        validateOnChange={false}
        onSubmit={formSubmit}
      >
        {({ handleSubmit, setValues, values, errors, handleBlur, touched }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <SFormContainer>
              <SForm>
                <STitle>{auth.welcomeBack}!</STitle>
                <SSubTitle>{auth.weGladSeeYou}!</SSubTitle>
                <SInputForm
                  help={touched.email && errors.email ? errors.email : ''}
                  validateStatus={errors.email && touched.email ? 'error' : 'success'}
                  valuePropName="email"
                  label={auth.email}
                  name={auth.email}
                >
                  <BaseInput
                    border="none"
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    value={values.email}
                    height="40px"
                    onBlur={handleBlur}
                    name="email"
                  />
                </SInputForm>
                <SInputForm
                  help={errors.password && touched.password ? errors.password : ''}
                  validateStatus={errors.password && touched.password ? 'error' : 'success'}
                  valuePropName="password"
                  label={auth.password}
                  name={auth.password}
                >
                  <BaseInput
                    value={values.password}
                    border="none"
                    type="password"
                    name="password"
                    height="40px"
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                    onBlur={handleBlur}
                  />
                </SInputForm>
                <SLink to="/">{auth.forgotYourPassword}?</SLink>
                <SBaseButton htmlType="submit">{auth.entrance}</SBaseButton>
                <SLinkWrap>
                  {auth.needAnAccount}? <SLink to="/registration">{auth.register}</SLink>
                </SLinkWrap>
              </SForm>
              <SLogoContainer>
                <Logo size={60} sizeBg="80px" color="white" />
                <STitle>{auth.name}</STitle>
              </SLogoContainer>
            </SFormContainer>
          </Form>
        )}
      </Formik>
    </ContainerAuth>
  );
};
