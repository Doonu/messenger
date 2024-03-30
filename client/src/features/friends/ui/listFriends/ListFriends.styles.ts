import styled from 'styled-components';
import { Typography } from 'antd';

interface ISContainer {
  $isBorder: boolean;
}

export const SContainer = styled.div<ISContainer>`
  ${({ $isBorder, theme }) =>
    $isBorder &&
    `
    border-bottom: 1px solid ${theme.colors.secondaryText};
    padding-bottom: 10px;
  `};
`;

export const STitle = styled.h5`
  margin-bottom: 15px;
  cursor: pointer;

  & span {
    color: ${({ theme }) => theme.colors.active};
    font-size: 16px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const SUsers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SName = styled(Typography.Text).attrs({
  ellipsis: true,
})`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.active};
`;

export const SUser = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  cursor: pointer;

  &:hover ${SName} {
    text-decoration: underline;
  }
`;
