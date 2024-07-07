import React from 'react';
import { Formik } from 'formik';
import { useAppDispatch } from '@shared/hooks';
import { postLogin, getProfile, SocketApi } from '@shared/api';
import { ContainerAuth } from '@shared/styles';
import { auth } from '@shared/strings';
import { BaseInput } from '@shared/components';
import { Form } from 'antd';

import {
  SBaseButton,
  SFormContainer,
  SInputForm,
  SLink,
  SLinkWrap,
  SSubTitle,
  SForm,
  SLogo,
  SLogoContainer,
  STitle,
} from './login.styled';
import { ILoginState } from '../model/login.type';
import { addressRules, passwordRules } from '../lib/login.rules';
import { initialValue } from '../lib/login.initialValue';

// TODO: вернуть SForm и logo

export function Login() {
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
        enableReinitialize
        initialValues={initialValue}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={formSubmit}
      >
        {({ handleSubmit, setValues, values, errors, handleBlur }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <SFormContainer>
              <SForm>
                <STitle>{auth.welcomeBack}!</STitle>
                <SSubTitle>{auth.weGladSeeYou}!</SSubTitle>
                <SInputForm
                  help={errors.email}
                  label={auth.email}
                  name={auth.email}
                  rules={addressRules}
                >
                  <BaseInput
                    name={auth.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    value={values.email}
                    border="none"
                    height="40px"
                  />
                </SInputForm>
                <SInputForm
                  help={errors.password}
                  label={auth.password}
                  name={auth.password}
                  rules={passwordRules}
                >
                  <BaseInput
                    border="none"
                    name={auth.password}
                    type="password"
                    height="40px"
                    onBlur={handleBlur}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                    value={values.password}
                  />
                </SInputForm>
                <SLink to="/">{auth.forgotYourPassword}?</SLink>
                <SBaseButton htmlType="submit">{auth.entrance}</SBaseButton>
                <SLinkWrap>
                  {auth.needAnAccount}? <SLink to="/index">{auth.register}</SLink>
                </SLinkWrap>
              </SForm>
              <SLogoContainer>
                {/* <SLogo shadow /> */}
                <SLogo />
                <STitle>{auth.name}</STitle>
              </SLogoContainer>
            </SFormContainer>
          </Form>
        )}
      </Formik>
    </ContainerAuth>
  );
}
