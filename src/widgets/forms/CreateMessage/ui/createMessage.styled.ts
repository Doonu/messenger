import styled from 'styled-components';
import { AutosizeInput } from '@shared/components';

export const SContainer = styled.div`
  padding: 15px;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 0 0 15px 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SInfo = styled.div`
  padding: 0 25px 0 35px;
  color: ${({ theme }) => theme.colors.active};
`;

export const SEdit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SMessage = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.link};
  &:hover {
    text-decoration: underline;
  }
`;

export const SClose = styled.div`
  cursor: pointer;
`;

export const SForm = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const SButton = styled.div`
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    opacity: 0.7;
  }
`;

export const SInput = styled(AutosizeInput)`
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 5px;
  width: 100%;
`;
