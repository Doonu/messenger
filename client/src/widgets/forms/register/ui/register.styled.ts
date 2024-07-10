import styled from 'styled-components';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { BaseButton } from '@shared/components';
import { ContainerAuth } from '@shared/styles';

export const SContainerAuth = styled(ContainerAuth)`
  max-width: 500px;
  min-width: 500px;
`;

export const STitle = styled.h1`
  color: ${({ theme }) => theme.colors.active};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

export const SInputForm = styled(Form.Item)`
  .ant-form-item-label > label {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SBaseButton = styled(BaseButton)`
  margin: 10px 0;
`;

export const SLink = styled(Link)`
  color: ${({ theme }) => theme.colors.link};
`;
