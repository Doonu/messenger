import styled, { css } from 'styled-components';
import BaseButton from 'shared/components/ui/buttons/baseButton';
import { Comment, Shared } from 'shared/assets/icons';
import React from 'react';

export const SInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  border-radius: 20px;
`;

export const SShared = styled(BaseButton).attrs({
  variant: 'secondary',
  radius: 20,
  leftIcon: <Shared size={22} />,
})`
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.secondaryText};
`;

export const SComment = styled(BaseButton).attrs({
  variant: 'secondary',
  radius: 20,
  leftIcon: <Comment size={20} />,
})`
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.secondaryText};
  ${({ disabled }) =>
    disabled &&
    css`
      background: ${({ theme }) => theme.colors.secondaryText} !important;
      opacity: 0.6;
    `}
`;
