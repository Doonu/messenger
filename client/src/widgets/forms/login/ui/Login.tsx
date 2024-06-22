import React from 'react';
import { Formik } from 'formik';
import {
  SBaseButton,
  SFormContainer,
  SInputForm,
  SLink,
  SLinkWrap,
  SSubTitle,
} from './login.styled';
import { SForm, SLogo, SLogoContainer, STitle } from './login.styled';
import { ILoginState } from '../model/login.type';
import { useAppDispatch } from 'hooks/redux';
import { postLogin, getProfile } from 'shared/api';
import { ContainerAuth } from 'shared/styles/containers';
import { addressRules, passwordRules } from '../lib/login.rules';
import { initialValue } from '../lib/login.initialValue';
import { auth } from 'shared/strings/auth';
import Input from 'shared/components/ui/inputs/baseInput';

//TODO: Сделать мобилку
//TODO: Разбить на компоненты

const Login = () => {
  const dispatch = useAppDispatch();

  const formSubmit = (values: ILoginState) => {
    dispatch(postLogin(values))
      .unwrap()
      .then(() => {
        dispatch(getProfile())
          .unwrap()
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <ContainerAuth>
      <Formik
        enableReinitialize
        initialValues={initialValue}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={formSubmit}
      >
        {({ handleSubmit, setValues, values, errors, handleBlur }) => (
          <SForm layout="vertical" onFinish={handleSubmit}>
            <SFormContainer>
              <STitle>{auth.welcomeBack}!</STitle>
              <SSubTitle>{auth.weGladSeeYou}!</SSubTitle>
              <SInputForm
                help={errors.email}
                label={auth.email}
                name={auth.email}
                rules={addressRules}
              >
                <Input
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
                <Input
                  border="none"
                  name={auth.password}
                  type="password"
                  height="40px"
                  onBlur={handleBlur}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  value={values.password}
                />
              </SInputForm>
              <SLink to={'/'}>{auth.forgotYourPassword}?</SLink>
              <SBaseButton htmlType="submit">{auth.entrance}</SBaseButton>
              <SLinkWrap>
                {auth.needAnAccount}? <SLink to={'/registration'}>{auth.register}</SLink>
              </SLinkWrap>
            </SFormContainer>
            <SLogoContainer>
              <SLogo shadow />
              <STitle>{auth.name}</STitle>
            </SLogoContainer>
          </SForm>
        )}
      </Formik>
    </ContainerAuth>
  );
};

export default Login;
