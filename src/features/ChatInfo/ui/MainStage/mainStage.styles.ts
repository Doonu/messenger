import styled from 'styled-components';
import { Typography } from 'antd';

import { SPaddingForModal } from '../chatInfo.styles';

export const STitle = styled(SPaddingForModal)`
  color: ${({ theme }) => theme.colors.active};
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const SChatInfo = styled(SPaddingForModal)`
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SName = styled(Typography.Text)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  color: ${({ theme }) => theme.colors.active};
`;

export const SText = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

export const SBr = styled.div`
  height: 10px;
  background: ${({ theme }) => theme.colors.secondary};
`;

export const SForm = styled.div`
  & > * {
    padding: 10px 24px 0 24px;
  }
`;

export const SAddPlayer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.colors.blue};
  svg {
    transition: 0.5s;
    color: ${({ theme }) => theme.colors.blue};
  }
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    color: ${({ theme }) => theme.colors.active};
    svg {
      color: ${({ theme }) => theme.colors.active};
    }
  }
  padding-left: 35px;
`;

export const AllPlayers = styled.div`
  padding-left: 35px;
`;

export const SExit = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 0 0 5px 5px;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
