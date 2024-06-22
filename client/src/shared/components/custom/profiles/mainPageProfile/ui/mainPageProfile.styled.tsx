import React from 'react';
import styled from 'styled-components';
import { BlockContainer } from 'shared/styles/containers';
import BaseButton from 'shared/components/ui/buttons/baseButton';
import { Comment } from 'shared/assets/icons';

export const SBlockContainer = styled(BlockContainer)`
  margin-bottom: 15px;
  padding: 2px;
  position: relative;
`;

export const SHeader = styled.div`
  background: #4f5154;
  width: 100%;
  height: 150px;
  border-radius: 5px 5px 0 0;
  padding-top: 20px;
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding-left: 150px;
  padding-top: 20px;
  height: 120px;
`;

export const SRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SNavigate = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding-right: 30px;
`;

export const SMessage = styled(BaseButton).attrs({
  variant: 'secondary',
  radius: 20,
  leftIcon: <Comment size={22} />,
})`
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.secondaryText};
`;

export const SName = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 30px;
`;
