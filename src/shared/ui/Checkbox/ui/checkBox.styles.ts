import styled, { css } from 'styled-components';
import { Checkbox } from 'antd';

import { ICheckBoxStyle } from '../model/checkBox.types';

export const SSizeCheckBox = css<ICheckBoxStyle>`
  ${({ $size }) =>
    $size === 'primary' &&
    css`
      width: 20px;
      height: 20px;
      scale: 1.1;
    `}
  ${({ $size }) =>
    $size === 'secondary' &&
    css`
      width: 15px;
      height: 15px;
    `}
`;

export const SCheckBox = styled(Checkbox)<ICheckBoxStyle>`
  .ant-checkbox .ant-checkbox-inner {
    ${SSizeCheckBox};
    border-radius: ${({ $radius }) => ($radius === 'circle' ? '100%' : '10%')};
  }

  .ant-checkbox-disabled .ant-checkbox-inner {
    ${SSizeCheckBox};
    background-color: gray;
    border-color: gray;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    ${SSizeCheckBox};
    background-color: ${({ theme }) => theme.colors.link};
    color: red;
    border: 1px solid ${({ theme }) => theme.colors.link};
  }
`;
